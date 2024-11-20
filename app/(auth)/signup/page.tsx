"use client";
import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const { signUp } = useSignUp();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const signupResult = await signUp?.create({
        emailAddress: email,
        password,
      });

      console.log(signupResult);

      if (signupResult) {
        setIsVerificationSent(true);
        console.log("Verification code sent to email.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleVerifyAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const verificationResult = await signUp?.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (verificationResult) {
        console.log("Account verified successfully.");
      }
    } catch (error) {
      console.log("Verification failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Signup
        </button>
      </form>
      {isVerificationSent && (
        <form onSubmit={handleVerifyAccount} className="mt-4">
          <div>
            <label>Verification Code:</label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-md"
          >
            Verify Account
          </button>
        </form>
      )}
    </div>
  );
};

export default SignupPage;
