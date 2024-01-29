"use server";
import prismadb from "@/lib/prismadb";
import bcrypt from "bcrypt";

export const getPasswordResetTokenByToken = async (token) => {
  try {
    const passwordResetToken = await prismadb.user.findUnique({
      where: { token },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

export default async function newPassword(password, token) {
  try {
    // If user Exists Generate token for password change
    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
      return { error: "Invalid token!" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return { error: "Token has expired!" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prismadb.user.update({
      where: { token },
      data: { hashedPassword, token: "" },
    });

    return { success: "Password updated!" };
  } catch (error) {
    console.log(error);
    return null;
  }
}
