import { Resend } from "resend";

function clean(value = "", max = 500) {
  return String(value)
    .replaceAll("<", "")
    .replaceAll(">", "")
    .replaceAll("\r", "")
    .trim()
    .slice(0, max);
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(value = "") {
  const email = String(value).trim();
  return !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.RESEND_API_KEY || !process.env.LEAD_TO_EMAIL) {
    return res.status(500).json({ error: "Email service is not configured" });
  }

  try {
    const body = req.body || {};
    const name = clean(body.name, 80);
    const phone = clean(body.phone, 40);
    const email = clean(body.email, 100);
    const message = clean(body.message, 800);

    if (!name || !phone) {
      return res.status(400).json({ error: "Name and phone are required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Air Duct Leads <onboarding@resend.dev>",
      to: process.env.LEAD_TO_EMAIL,
      replyTo: email || process.env.LEAD_TO_EMAIL,
      subject: "New Air Duct Cleaning Lead",
      html: `
        <h2>New Lead Request</h2>
        <p><b>Name:</b> ${escapeHtml(name)}</p>
        <p><b>Phone:</b> ${escapeHtml(phone)}</p>
        <p><b>Email:</b> ${escapeHtml(email || "Not provided")}</p>
        <p><b>Message:</b> ${escapeHtml(message || "No message")}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({ error: "Failed to send lead" });
  }
}
