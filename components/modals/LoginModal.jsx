"use client";

import { signIn } from "next-auth/react";
import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useState } from "react";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Input from "../inputs/Input";
import { useRouter } from "next/navigation";
import useRegisterModal from "@/hooks/useRegisterModal";
import { Button } from "../ui/button";
import Link from "next/link";

export default function LoginModal() {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });

  const onSubmit = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      role: "USER",
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success("Logged In");
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div>
      <div className="flex flex-col gap-4">
        <div className="text-start">
          <div className="text-2xl font-bold">Welcome back</div>
          <div className="font-ligt text-neutral-500 mt-2">
            Login to your account!
          </div>
        </div>
        <Input
          id="email"
          label="Email"
          type="email"
          required
          disabled={isLoading}
          register={register('email')}
          errors={errors}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          required
          disabled={isLoading}
          register={register('password')}
          errors={errors}
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          className="mt-6 py-3 text-md font-semibold bg-rose-500"
        >
          Login
        </Button>
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <hr />
        <div className="text-neutral-500 text-center font-light">
          <div className="flex flex-row justify-center items-center gap-2">
            <div>Forgot your password?</div>
            <div
              onClick={() => {
                loginModal.onClose()
                router.push('/reset-password')
              }}
              className="text-neutral-800 cursor-pointer hover:underline"
            >
              Reset here
            </div>
          </div>
        </div>
        <div className="text-neutral-500 text-center mb-4 font-light">
          <div className="flex flex-row justify-center items-center gap-2">
            <div>You dont have an account?</div>
            <div
              onClick={toggle}
              className="text-neutral-800 cursor-pointer hover:underline"
            >
              Create an account
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      title="Login"
      actionLabel="Login"
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
}
