"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const generatePasswordResetToken = async (email) => {
  // Generate Random number as a password token
  const token = uuidv4();

  // Make this token Expires in 1hr this is for security so that user cannot reset password after one hour of sending the email
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  // Update the user that forget his email and add password token to him
  const passwordResetToken = await db.user.update({
    where: {
      email: email,
    },
    data: {
      token,
      expires,
    },
  });

  return passwordResetToken;
};

function ResetPasswordPage() {
  const form = useForm({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (values) => {
    const { email } = values;

    try {
      // Check if we have user with this email first
      const user = await db.user.findUnique({ where: { email } });
      // If we don't have user with this email display an error message of Email is not Exists
      if (!user) {
        toast.error("We don't have user with this Email");
        return;
      }

      // If user Exists Generate token for password change
      const passwordResetToken = await generatePasswordResetToken(email);
      await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
      );

      return { success: "Reset email sent!" };
    } catch {
      return null;
    }

    console.log(email);
  };

  return (
    <main className="relative py-28">
      <div className="relative z-10 max-w-screen-xl mx-auto text-gray-600 sm:px-4 md:px-8">
        <div className="max-w-lg space-y-3 px-4 sm:mx-auto sm:text-center sm:px-0">
          <p className="text-pink-dark text-3xl font-semibold sm:text-4xl">
            Reset Password
          </p>
        </div>
        <div className="mt-5 mx-auto px-4 p-8 bg-white sm:max-w-lg sm:px-8 sm:rounded-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="john.doe@example.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full bg-pink-dark">
                Send reset email
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}

export default ResetPasswordPage;
