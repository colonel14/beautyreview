"use server";
import prismadb from "@/lib/prismadb";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";

export const generatePasswordResetToken = async (email) => {
  // Generate Random number as a password token
  const token = uuidv4();

  // Make this token Expires in 1hr this is for security so that user cannot reset password after one hour of sending the email
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  // Update the user that forget his email and add password token to him
  await prismadb.user.update({
    where: {
      email: email,
    },
    data: {
      token,
      tokenExpires: expires,
    },
  });

  return token;
};

export default async function resetPassword(email) {
  try {
    // Check if we have user with this email first
    const user = await prismadb.user.findUnique({ where: { email } });
    // If we don't have user with this email display an error message of Email is not Exists
    if (!user) {
      return { error: "We don't have user with this Email" };
    }

    // If user Exists Generate token for password change
    const passwordResetToken = await generatePasswordResetToken(email);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "beautyreview055@gmail.com",
        pass: "bkobhvtbshnwstyf",
      },
    });

    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/new-password?token=${passwordResetToken}`;

    console.log(resetLink);

    await transporter.sendMail({
      from: "beautyreview055@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `Click the following link to reset your password: ${resetLink}`,
    });

    return { success: "Reset Email send to your email!" };
  } catch (error) {
    console.log(error);
    return null;
  }
}
