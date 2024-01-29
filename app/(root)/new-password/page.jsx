"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import newPassword from "@/actions/newPassword";
import toast from "react-hot-toast";

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Minimum of 8 characters required" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      {
        message:
          "Must contain at least one uppercase, one lowercase, one digit, and one special character",
      }
    ),
});

function NewPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  // If there is no token redirect the use to the homepage
  if (!token) {
    router.push("/");
  }

  const form = useForm({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (values) => {
    const { password } = values;
    const result = await newPassword(password, token);

    console.log(result);

    if (result?.error) {
      toast.error(result.error);
    }
    if (result?.success) {
      toast.success(result.success);
      router.push("/");
    }
  };
  return (
    <main className="relative py-28">
      <div className="relative z-10 max-w-screen-xl mx-auto text-gray-600 sm:px-4 md:px-8">
        <div className="max-w-lg space-y-3 px-4 sm:mx-auto sm:text-center sm:px-0">
          <p className="text-pink-dark text-3xl font-semibold sm:text-4xl">
            New Password
          </p>
        </div>
        <div className="mt-5 mx-auto px-4 p-8 bg-white sm:max-w-lg sm:px-8 sm:rounded-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="******"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Reset password
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}

export default NewPasswordPage;
