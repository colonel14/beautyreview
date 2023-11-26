"use client";

import { signIn } from "next-auth/react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";

import { useForm } from "react-hook-form";
import useRegisterModal from "@/hooks/useRegisterModal";
import Modal from "./Modal";

import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { AlertModal } from "./AlertModal";
import useRecommendationModal from "@/hooks/useRecommendationModal";

export default function RegistgerModal() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const recommendationModal = useRecommendationModal();

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { name: "", email: "", password: "" } });

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const response = await axios.post("/api/register", data);

      signIn("credentials", {
        ...data,
        role: "USER",
        redirect: false,
      }).then((callback) => {
        setIsLoading(false);
        setOpen(true);
        if (callback?.ok) {
          toast.success("Success Regesteration!");
          router.refresh();
          registerModal.onClose();
        }

        if (callback?.error) {
          toast.error(callback.error);
        }
      });

      setIsLoading(false);
    } catch (error) {
      toast.error("Something Went Wrong!");
      setIsLoading(false);
    }
  };

  // On Confirm to take the recommendation form
  const onConfirm = () => {
    recommendationModal.onOpen();
    setOpen(false);
    router.push("/");
  };

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
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
        register={register}
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        errors={errors}
        required
        register={register}
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        errors={errors}
        required
        register={register}
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      {/* <Button
        outline
        label="Sign Up with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      /> */}

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
  );
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={isLoading}
        title="Would you like to have a personal recommendation?"
        description="Completing this form will assist us in suggesting products tailored to your interests."
        confirmLabel="Yes"
      />

      <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        onClose={registerModal.onClose}
        title="Register"
        actionLabel="Continue"
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
      />
    </>
  );
}
