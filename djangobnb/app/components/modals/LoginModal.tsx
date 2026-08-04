"use client";

import Modal from "./Modal";

import { useState } from "react";
import useLoginModal from "../../hooks/useLoginModal";
import CustomButton from "../forms/CustomButton";

const LoginModal = () => {
  const loginModal = useLoginModal();

  const content = (
    <>
      <form className="space-y-4">
        <input
          placeholder="Your email address"
          type="email"
          className="px-4 w-full h-14 border border-gray-300 rounded-xl"
        />

        <input
          placeholder="Your password"
          type="password"
          className="px-4 w-full h-14 border border-gray-300 rounded-xl"
        />

        <div className="p-5 bg-airbnb text-white rounded-xl opacity-80">
          The error message
        </div>

        <CustomButton
          label="Submit"
          onClick={() => console.log("Test button form")}
        />
      </form>
    </>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      close={loginModal.close}
      label="Login"
      content={content}
    />
  );
};

export default LoginModal;
