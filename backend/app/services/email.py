"""Business email notifications for new quote requests.

Preferred path: Brevo, an HTTPS-based email API. Used whenever
BREVO_API_KEY is set. Brevo's free tier verifies a single sender
*address* rather than a whole domain, so — unlike Resend's sandbox
mode — it can send to any recipient without owning a domain.

Second choice: Resend (also HTTPS). Used if BREVO_API_KEY is unset
but RESEND_API_KEY is set. Resend's free/sandbox mode can only send
to the account's own signup email until a full domain is verified.

Fallback: plain SMTP, used only if neither API key is set. Works for
local dev, where raw outbound SMTP usually works fine. It will NOT
work on Render's free tier — those connections fail with "OSError:
[Errno 101] Network is unreachable" regardless of credentials, because
Render blocks raw outbound SMTP sockets at the network level on that
plan. That's why the HTTPS-based providers above are tried first.

If nothing is configured, sending is silently skipped: the quote is
still saved to the database, so nothing is lost — check it via the
/admin endpoint or the database directly.

Never raises: a notification failure should not fail the API request
the customer is waiting on. Errors are logged instead.
"""

import json
import logging
import re
import smtplib
import urllib.error
import urllib.request
from email.message import EmailMessage

from app.core.config import get_settings
from app.models.quote import QuoteRequest

logger = logging.getLogger("grandroute.email")

settings = get_settings()

BREVO_API_URL = "https://api.brevo.com/v3/smtp/email"
RESEND_API_URL = "https://api.resend.com/emails"

# Without a normal-looking User-Agent, urllib's default
# ("Python-urllib/3.x") gets blocked by the Cloudflare bot filter in
# front of most email APIs before the request ever reaches the API
# itself — shows up as a generic "403 error code: 1010" Cloudflare
# page, not a provider-specific error.
USER_AGENT = "GrandRouteBackend/1.0 (+https://grand-route.vercel.app)"

_DISPLAY_NAME_RE = re.compile(r"^\s*(?:(?P<name>[^<]+)<)?(?P<email>[^<>]+?)>?\s*$")


def _parse_from_address(raw: str | None, default_email: str, default_name: str) -> tuple[str, str]:
    """Splits "Name <email>" or a bare email into (name, email)."""
    if not raw:
        return default_name, default_email
    match = _DISPLAY_NAME_RE.match(raw)
    if not match:
        return default_name, raw
    name = (match.group("name") or default_name).strip()
    email = match.group("email").strip()
    return name, email


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


def _post_json(url: str, payload: dict, headers: dict) -> None:
    request = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={**headers, "User-Agent": USER_AGENT},
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=10) as response:
        if response.status >= 300:
            raise RuntimeError(f"{url} returned status {response.status}")


def _send_via_brevo(quote: QuoteRequest, body: str) -> None:
    name, email = _parse_from_address(settings.from_email, "onboarding@brevo.com", "Grand Route")
    payload: dict = {
        "sender": {"name": name, "email": email},
        "to": [{"email": settings.notify_email}],
        "subject": f"New quote request — {quote.name} ({quote.service})",
        "textContent": body,
    }
    if quote.email:
        payload["replyTo"] = {"email": quote.email}

    _post_json(
        BREVO_API_URL,
        payload,
        headers={
            "api-key": settings.brevo_api_key,
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
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

    _post_json(
        RESEND_API_URL,
        payload,
        headers={
            "Authorization": f"Bearer {settings.resend_api_key}",
            "Content-Type": "application/json",
        },
    )


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
        if settings.brevo_api_key:
            _send_via_brevo(quote, body)
            logger.info("Sent quote notification email via Brevo for %s", quote.id)
        elif settings.resend_api_key:
            _send_via_resend(quote, body)
            logger.info("Sent quote notification email via Resend for %s", quote.id)
        elif settings.smtp_host:
            _send_via_smtp(quote, body)
            logger.info("Sent quote notification email via SMTP for %s", quote.id)
        else:
            logger.info(
                "No email provider configured (BREVO_API_KEY / RESEND_API_KEY / SMTP_HOST) "
                "— skipping email for quote %s",
                quote.id,
            )
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        logger.error("Email provider rejected the notification for %s: %s %s", quote.id, exc.code, detail)
    except Exception:
        logger.exception("Failed to send quote notification email for %s", quote.id)
