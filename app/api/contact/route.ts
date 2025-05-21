import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, message, recipient } = await request.json();
    console.log("Received request with data:", {
      name,
      email,
      message,
      recipient,
    });
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587", 10),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.verify();
    console.log("SMTP connection verified successfully");

    const mailOptions = {
      from: process.env.FROM_EMAIL || "website@example.com",
      to: recipient || process.env.TO_EMAIL || "default@example.com",
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Email sending failed:", error);
    return NextResponse.json(
      { error: "Failed to send email", detail: error.message },
      { status: 500 }
    );
  }
}
