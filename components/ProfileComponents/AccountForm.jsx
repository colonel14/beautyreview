"use client";

import { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProfileImageUpload from "@/components/ProfileImageUpload";

const formSchema = z.object({
  name: z.string().min(1) || null,
  email: z.string().email() || null,
  image: z.string().optional().or(z.null()) || null,
  password: z.string() || null,
});

function AccountForm({ initialData, currentUser }) {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const defaultValues = initialData
    ? {
        name: initialData.name || "",
        email: initialData.email || "",
        image: initialData.image || "",
        password: "",
      }
    : {
        name: "",
        email: "",
        image: "",
        password: "",
      };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await axios.patch(`/api/user`, data);

      router.refresh();
      router.push(`/profile`);
      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Avatar</FormLabel>
                <FormControl>
                  <ProfileImageUpload
                    disabled={loading}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Your Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    disabled={loading}
                    placeholder="Your Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    disabled={loading}
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-start gap-3">
            <Button disabled={loading} type="submit">
              Save changes
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

export default AccountForm;
