// Email service - placeholder for production setup
// Integrate with Resend, SendGrid, or SMTP

export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> {
  if (process.env.NODE_ENV === "development") {
    console.log("[EMAIL]", options);
    return;
  }
  throw new Error("Email service not configured. Set SMTP env vars.");
}
