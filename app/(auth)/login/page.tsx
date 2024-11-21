"use client";
import { SignIn } from "@clerk/nextjs";
import React from "react";

const LoginPage = () => {
  return (
    <div className="grid grid-cols-2 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome back</h1>
        <p className="max-w-lg">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum, quo
          maxime, quia blanditiis laborum eius saepe sed modi ipsum quis aut
          eligendi! Labore soluta doloremque rerum optio fugiat ex magnam?ß
        </p>
      </div>
      <SignIn routing="hash" />
    </div>
  );
};

export default LoginPage;
