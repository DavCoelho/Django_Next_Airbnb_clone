"use client";

import Modal from "./Modal";

import { useState } from "react";
import useSignupModal from "../../hooks/useSignupModal";
import CustomButton from "../forms/CustomButton";

const SignupModal = () => {
  const signupModal = useSignupModal();

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
        <input
          placeholder="Confirm your password"
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
      isOpen={signupModal.isOpen}
      close={signupModal.close}
      label="Sign up "
      content={content}
    />
  );
};

export default SignupModal;
