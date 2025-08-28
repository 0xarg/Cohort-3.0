import { Email } from "@/app/api/mail/Email";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import nodemailer from "nodemailer";
const resend = new Resend(process.env.RESEND_API_KEY);

interface mailProps {
  email: string;
  token: string;
}




export const sendMail = async ({ email, token }: mailProps) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD
    },
  });
  const verifiedUrl = `${process.env.NEXTAUTH_URL}/register?token=${token}`;
  
  const mailOptions = {
    from: `"BookMyTime" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your email",
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6">
    <p>Hi <b>${email}</b>,</p>
    <p>Thanks for signing up for <b>BookMyTime</b>! Please verify your email:</p>
    <a href="${verifiedUrl}" 
    style="display:inline-block;padding:10px 20px;background:#2563eb;color:#fff;border-radius:6px;text-decoration:none;">
    Verify Now
    </a>
    <p>If the button doesn’t work, copy this link:</p>
    <p>${verifiedUrl}</p>
    </div>
    `,
  };
  try {
    const mailRes = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${mailRes.messageId}`)
    return mailRes

  } catch (error) {
    console.error(`Error sending the mail: ${error}`);
    throw error;
  }
};
