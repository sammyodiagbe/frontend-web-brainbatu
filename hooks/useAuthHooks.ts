"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema, signupSchema } from "@/utils/types";

const useAuthHook = () => {
  // const { signUp } = useSignUp();
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
  });

  const handleSignup = async (data: SignupSchema) => {
    // const signupResult = await signUp?.create({
    //     emailAddress: data.email,
    //     password: data.password,
    // })
  };

  return {
    form,
    handleSignup,
  };
};

export default useAuthHook;
