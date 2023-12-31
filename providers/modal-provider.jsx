"use client";

import { useState, useEffect } from "react";
import RegistgerModal from "@/components/modals/RegistgerModal";
import LoginModal from "@/components/modals/LoginModal";
import RecommendationModal from "@/components/modals/RecommendationModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <RegistgerModal />
      <LoginModal />
    </>
  );
};
