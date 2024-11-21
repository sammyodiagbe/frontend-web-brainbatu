"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useSignUp } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const VerifyEmailAddressPage = () => {
  const { signUp } = useSignUp();

  const handleVerifyEmail = async (code: string) => {
    try {
      const result = await signUp?.attemptEmailAddressVerification({
        code,
      });
      if (result?.status === "complete") {
        redirect("/");
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Verify your email address</h1>
      <p className="text-lg">
        We&apos;ve sent you an email with a link to verify your email address.
      </p>

      <InputOTP maxLength={6} onComplete={handleVerifyEmail}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
};

export default VerifyEmailAddressPage;
