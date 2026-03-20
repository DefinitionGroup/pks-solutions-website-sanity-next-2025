import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  recipient?: string;
};

const REQUIRED_ENV_VARS = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'FROM_EMAIL',
] as const;

function getMissingEnvVars() {
  return REQUIRED_ENV_VARS.filter((key) => {
    const value = process.env[key];
    return typeof value !== 'string' || value.trim().length === 0;
  });
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#39;';
      default:
        return character;
    }
  });
}

function getErrorDetail(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'Unknown error';
}

export async function POST(request: Request) {
  try {
    const { name, email, message, recipient }: ContactPayload =
      await request.json();

    const trimmedName = name?.trim();
    const trimmedEmail = email?.trim();
    const trimmedMessage = message?.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 },
      );
    }

    const missingEnvVars = getMissingEnvVars();
    if (missingEnvVars.length > 0) {
      console.error(
        'Contact form configuration error. Missing env vars:',
        missingEnvVars,
      );

      return NextResponse.json(
        {
          error: 'Contact form is not configured correctly.',
          detail: `Missing environment variables: ${missingEnvVars.join(', ')}`,
        },
        { status: 500 },
      );
    }

    const port = Number(process.env.SMTP_PORT);
    if (!Number.isInteger(port) || port <= 0) {
      return NextResponse.json(
        {
          error: 'Contact form is not configured correctly.',
          detail: 'SMTP_PORT must be a valid positive integer.',
        },
        { status: 500 },
      );
    }

    const toEmail =
      process.env.TO_EMAIL?.trim() ||
      recipient?.trim() ||
      process.env.FROM_EMAIL?.trim();
    if (!toEmail) {
      return NextResponse.json(
        {
          error: 'Contact form is not configured correctly.',
          detail:
            'No recipient email is configured. Add TO_EMAIL in Vercel, set a recipient in Sanity, or configure FROM_EMAIL.',
        },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: process.env.SMTP_SECURE?.trim().toLowerCase() === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const safeName = escapeHtml(trimmedName);
    const safeEmail = escapeHtml(trimmedEmail);
    const safeMessage = escapeHtml(trimmedMessage).replace(/\n/g, '<br />');

    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: toEmail,
      replyTo: trimmedEmail,
      subject: `New contact form submission from ${trimmedName}`,
      text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`,
      html: `
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    console.log('Email sent:', info.messageId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email sending failed:', error);

    return NextResponse.json(
      {
        error: 'Failed to send email.',
        detail: getErrorDetail(error),
      },
      { status: 500 },
    );
  }
}
