"""Business email notifications for new quote requests.

Uses plain SMTP (works with Gmail App Passwords, SendGrid SMTP relay,
Postmark, etc. — anything that speaks SMTP). If SMTP isn't configured
(no smtp_host / notify_email), sending is silently skipped: the
request is still saved to the database, so nothing is lost — the
office can check the /admin endpoint or the database directly.

Never raises: a notification failure should not fail the API request
that the customer is waiting on. Errors are logged instead.
"""

import logging
import smtplib
from email.message import EmailMessage

from app.core.config import get_settings
from app.models.quote import QuoteRequest

logger = logging.getLogger("grandroute.email")

settings = get_settings()


def send_quote_notification(quote: QuoteRequest) -> None:
    if not settings.smtp_host or not settings.notify_email:
        logger.info("SMTP not configured — skipping email notification for quote %s", quote.id)
        return

    body = (
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

    message = EmailMessage()
    message["Subject"] = f"New quote request — {quote.name} ({quote.service})"
    message["From"] = settings.from_email or settings.smtp_username or settings.notify_email
    message["To"] = settings.notify_email
    if quote.email:
        message["Reply-To"] = quote.email
    message.set_content(body)

    try:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=10) as server:
            if settings.smtp_use_tls:
                server.starttls()
            if settings.smtp_username and settings.smtp_password:
                server.login(settings.smtp_username, settings.smtp_password)
            server.send_message(message)
        logger.info("Sent quote notification email for %s", quote.id)
    except Exception:
        logger.exception("Failed to send quote notification email for %s", quote.id)
