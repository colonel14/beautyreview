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
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const formSchema = z.object({
  overallSatisfaction: z.number().refine((value) => value >= 1, {
    message: "You must rate the product!",
  }),
  reasonablyPriced: z.number().refine((value) => value >= 1, {
    message: "You must rate the product!",
  }),
  qualityRating: z.number().refine((value) => value >= 1, {
    message: "You must rate the product!",
  }),
  effectivenessRating: z.number().refine((value) => value >= 1, {
    message: "You must rate the product!",
  }),
  packagingRating: z.number().refine((value) => value >= 1, {
    message: "You must rate the product!",
  }),
  skinMatchRating: z.number().refine((value) => value >= 1, {
    message: "You must rate the product!",
  }),
  recommendToOthers: z.string(),
  comment: z.string().min(1, {
    message: "Comment is required!",
  }),
});

const ReviewForm = ({ productId, userId }) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const [loading, setLoading] = useState(false);

  const defaultValues = {
    overallSatisfaction: 0,
    reasonablyPriced: 0,
    qualityRating: 0,
    effectivenessRating: 0,
    packagingRating: 0,
    skinMatchRating: 0,
    recommendToOthers: "false",
    comment: "",
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
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
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const onInvalid = (errors) => console.error(errors);

  return (
    <div id="reviewSection">
      <h1 className="text-xl font-medium mb-4">Give your opinions</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="overallSatisfaction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  How Satisfied are you with the product overall?
                </FormLabel>
                <FormControl>
                  <ReactStars
                    {...field}
                    size={17}
                    isEdit={true}
                    activeColors={["red", "orange", "orange", "#FFCE00"]}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reasonablyPriced"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Do you think the product reasonably priced?
                </FormLabel>
                <FormControl>
                  <ReactStars
                    {...field}
                    size={17}
                    isEdit={true}
                    activeColors={["red", "orange", "orange", "#FFCE00"]}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="qualityRating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rate the quality of the product?</FormLabel>
                <FormControl>
                  <ReactStars
                    {...field}
                    size={17}
                    isEdit={true}
                    activeColors={["red", "orange", "orange", "#FFCE00"]}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="effectivenessRating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  How effective was the product in achieving its stated purpose?
                </FormLabel>
                <FormControl>
                  <ReactStars
                    {...field}
                    size={17}
                    isEdit={true}
                    activeColors={["red", "orange", "orange", "#FFCE00"]}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="packagingRating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rate the packaging of the product?</FormLabel>
                <FormControl>
                  <ReactStars
                    {...field}
                    size={17}
                    isEdit={true}
                    activeColors={["red", "orange", "orange", "#FFCE00"]}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="skinMatchRating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How well the product matched your skin?</FormLabel>
                <FormControl>
                  <ReactStars
                    {...field}
                    size={17}
                    isEdit={true}
                    activeColors={["red", "orange", "orange", "#FFCE00"]}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="recommendToOthers"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  Would you recommed this product to ther other?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center gap-5"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="false" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="true" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                  </RadioGroup>
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
                <FormLabel>Write your comment here</FormLabel>
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
