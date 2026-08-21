"use client";

import Modal from "./Modal";

import { useState } from "react";
import { useRouter } from "next/navigation";

import useSignupModal from "../../hooks/useSignupModal";
import CustomButton from "../forms/CustomButton";
import apiService from "../../services/apiService";
import { handleLogin } from "../../lib/actions";

const SignupModal = () => {
  const router = useRouter();
  const signupModal = useSignupModal();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const submitSignup = async () => {
    const formData = {
      name: name,
      email: email,
      password1: password1,
      password2: password2,
    };

    const response = await apiService.postWithoutToken(
      "/api/auth/register/",
      JSON.stringify(formData),
    );

    if (response.access) {
      handleLogin(response.user.pk, response.access, response.refresh);

      signupModal.close();

      router.push("/");
    } else {
      const tmpErrors: string[] = Object.values(response).map((error: any) => {
        return error;
      });

      setErrors(tmpErrors);
    }
  };

  const content = (
    <>
      <form action={submitSignup} className="space-y-4">
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          type="email"
          className="px-4 w-full h-14 border border-gray-300 rounded-xl"
        />

        <input
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          type="text"
          className="px-4 w-full h-14 border border-gray-300 rounded-xl"
        />

        <input
          onChange={(e) => setPassword1(e.target.value)}
          placeholder="Your password"
          type="password"
          className="px-4 w-full h-14 border border-gray-300 rounded-xl"
        />
        <input
          onChange={(e) => setPassword2(e.target.value)}
          placeholder="Confirm your password"
          type="password"
          className="px-4 w-full h-14 border border-gray-300 rounded-xl"
        />

        {errors.map((error, index) => {
          return (
            <div
              key={`error_${index}`}
              className="p-5 bg-airbnb text-white rounded-xl opacity-80"
            >
              {error}
            </div>
          );
        })}

        <CustomButton label="Submit" onClick={submitSignup} />
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
