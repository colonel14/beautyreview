"use client";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

function ContactForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({});

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await axios.post(`/api/contact`, data);

      router.refresh();
      toast.success("We have Received your comment successfully, Thank you.");
      reset();
    } catch (error) {
      toast.error("Something Went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 mt-12 lg:pb-12"
    >
      <div>
        <label className="font-medium text-pink-dark">Your Name</label>
        <input
          type="text"
          {...register("name", {
            required: "Please fill your name in this field!",
          })}
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
        />
        <p className="text-red-600">{errors.fullname?.message}</p>
      </div>
      <div>
        <label className="font-medium text-pink-dark">Your Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Please, Fill your email!",
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "Please enter a valid email",
            },
          })}
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
        />
        <p className="text-red-600">{errors.email?.message}</p>
      </div>

      <div>
        <label className="font-medium text-pink-dark">Your Message</label>
        <textarea
          {...register("message", {
            required: "Please write your message!",
          })}
          className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border  focus:border-gray-800 shadow-sm rounded-lg"
        ></textarea>
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="bg-pink-dark block w-[150px] mx-auto"
      >
        Send
      </Button>
    </form>
  );
}

export default ContactForm;
