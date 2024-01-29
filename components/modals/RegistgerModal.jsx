"use client";

import axios from "axios";
import { useCallback, useState } from "react";

import { useForm } from "react-hook-form";
import useRegisterModal from "@/hooks/useRegisterModal";
import Modal from "./Modal";

import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import useLoginModal from "@/hooks/useLoginModal";
import { Button } from "../ui/button";

export default function RegistgerModal() {
  const [open, setOpen] = useState(false);

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { name: "", email: "", password: "" } });

  const onSubmit = async (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Success Regesteration!");
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error(error?.response.data.error || "Something Went Wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <>
      <div className="flex flex-col gap-4">
        <div className="text-start">
          <div className="text-2xl font-bold">Welcome to Beauty Review</div>
          <div className="font-ligt text-neutral-500 mt-2">
            Create an account!
          </div>
        </div>
        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          errors={errors}
          required
          register={register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
              message: "Invalid email address (e.g:john.doe@example.com)",
            },
          })}
        />
        <Input
          id="name"
          label="Name"
          disabled={isLoading}
          errors={errors}
          required
          register={register("name", {
            required: "Name is required",
          })}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          disabled={isLoading}
          errors={errors}
          required
          register={register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
              message:
                "Password must contain at least one lowercase, one uppercase, one numeric, and one special character",
            },
          })}
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          className="mt-6 py-3 text-md font-semibold bg-rose-500"
        >
          Register
        </Button>
      </div>
      <div className="flex flex-col gap-4 mt-3">
        <hr />
        <div className="text-neutral-500 text-center mb-4 font-light">
          <div className="flex flex-row justify-center items-center gap-2">
            <div>Already have an account?</div>
            <div
              onClick={toggle}
              className="text-neutral-800 cursor-pointer hover:underline"
            >
              Login
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        onClose={registerModal.onClose}
        title="Register"
        actionLabel="Continue"
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
      />
    </>
  );
}
