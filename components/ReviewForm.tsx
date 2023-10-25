"use client";
import React, { useState } from "react";
import ReactStars from "react-rating-star-with-type";
import axios from "axios";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import useLoginModal from "@/hooks/useLoginModal";

type Props = {
  productId?: string;
  userId?: string | undefined;
};

const formSchema = z.object({
  rating: z.number(),
  comment: z.string().min(1),
});

type ReviewFormValue = z.infer<typeof formSchema>;

const ReviewForm = ({ productId, userId }: Props) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const [loading, setLoading] = useState(false);

  const defaultValues = {
    star: 0,
    comment: "",
  };

  const form = useForm<ReviewFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: any) => {
    setLoading(true);

    if (!userId) {
      toast.error("Please login First");
      loginModal.onOpen();
      return;
    }

    if (!productId) {
      toast.error("Invalid Product");
      return;
    }

    data.userId = userId;
    data.productId = productId;

    try {
      await axios.post(`/api/review`, data);
      toast.success("Review submitted successfully");
      router.refresh();
      form.reset();
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const onInvalid = (errors: any) => console.error(errors);

  return (
    <div>
      <h1 className="text-xl font-medium mb-4">Give your opinions</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Give Rating</FormLabel>
                <FormControl>
                  <ReactStars
                    {...field}
                    size={17}
                    isEdit={true}
                    activeColors={[
                      "red",
                      "orange",
                      "#FFCE00",
                      "#9177FF",
                      "#8568FC",
                    ]}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Write you comment here</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={loading}
                    placeholder="Comment..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={loading}
            className="ml-auto bg-pink-dark "
            type="submit"
          >
            Add Comment
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ReviewForm;
