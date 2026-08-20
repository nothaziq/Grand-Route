"""Business email notifications for new quote requests.

Preferred path: Resend, an HTTPS-based email API (POST to
api.resend.com over port 443). Used whenever RESEND_API_KEY is set.

Fallback path: plain SMTP, used only if RESEND_API_KEY is unset. This
exists for local development, where raw outbound SMTP usually works
fine. It will NOT work on Render's free tier — those connections fail
with "OSError: [Errno 101] Network is unreachable" regardless of
credentials, because Render blocks raw outbound SMTP sockets at the
network level on that plan. That's why Resend is the primary path.

If neither is configured, sending is silently skipped: the quote is
still saved to the database, so nothing is lost — check it via the
/admin endpoint or the database directly.

Never raises: a notification failure should not fail the API request
the customer is waiting on. Errors are logged instead.
"""

import json
import logging
import smtplib
import urllib.error
import urllib.request
from email.message import EmailMessage

from app.core.config import get_settings
from app.models.quote import QuoteRequest

logger = logging.getLogger("grandroute.email")

settings = get_settings()

RESEND_API_URL = "https://api.resend.com/emails"


def _build_body(quote: QuoteRequest) -> str:
    return (
        f"New quote request received on the Grand Route website.\n\n"
        f"Name: {quote.name}\n"
        f"Company: {quote.company or '-'}\n"
        f"Phone: {quote.phone}\n"
        f"Email: {quote.email or '-'}\n"
        f"Service: {quote.service}\n"
        f"Preferred date: {quote.preferred_date or '-'}\n"
        f"Location: {quote.location or '-'}\n\n"
        f"Requirement:\n{quote.requirement}\n\n"
        f"Reference ID: {quote.id}\n"
        f"Received: {quote.created_at.isoformat()} UTC\n"
    )


def _send_via_resend(quote: QuoteRequest, body: str) -> None:
    from_address = settings.from_email or "Grand Route <onboarding@resend.dev>"
    payload: dict = {
        "from": from_address,
        "to": [settings.notify_email],
        "subject": f"New quote request — {quote.name} ({quote.service})",
        "text": body,
    }
    if quote.email:
        payload["reply_to"] = quote.email

    request = urllib.request.Request(
        RESEND_API_URL,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {settings.resend_api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=10) as response:
        if response.status >= 300:
            raise RuntimeError(f"Resend API returned status {response.status}")


def _send_via_smtp(quote: QuoteRequest, body: str) -> None:
    message = EmailMessage()
    message["Subject"] = f"New quote request — {quote.name} ({quote.service})"
    message["From"] = settings.from_email or settings.smtp_username or settings.notify_email
    message["To"] = settings.notify_email
    if quote.email:
        message["Reply-To"] = quote.email
    message.set_content(body)

    with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=10) as server:
        if settings.smtp_use_tls:
            server.starttls()
        if settings.smtp_username and settings.smtp_password:
            server.login(settings.smtp_username, settings.smtp_password)
        server.send_message(message)


def send_quote_notification(quote: QuoteRequest) -> None:
    if not settings.notify_email:
        logger.info("NOTIFY_EMAIL not configured — skipping email notification for quote %s", quote.id)
        return

    body = _build_body(quote)

    try:
        if settings.resend_api_key:
            _send_via_resend(quote, body)
            logger.info("Sent quote notification email via Resend for %s", quote.id)
        elif settings.smtp_host:
            _send_via_smtp(quote, body)
            logger.info("Sent quote notification email via SMTP for %s", quote.id)
        else:
            logger.info(
                "Neither RESEND_API_KEY nor SMTP_HOST configured — skipping email for quote %s",
                quote.id,
            )
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        logger.error(
            "Resend API rejected the notification for %s: %s %s", quote.id, exc.code, detail
        )
    except Exception:
        logger.exception("Failed to send quote notification email for %s", quote.id)
