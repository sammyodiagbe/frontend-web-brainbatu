"use client";
import { Form } from "@/components/ui/form";
import useAuthHook from "@/hooks/useAuthHooks";
import { Button } from "@/components/ui/button";
import FormFieldWrapper from "@/components/forms/formWrapper";
import { SignUp } from "@clerk/nextjs";
const SignupPage = () => {
  const { form, handleSignup } = useAuthHook();

  return (
    <div className="grid grid-cols-2 items-center justify-center h-screen">
      <div className="px-10 space-y-4 flex flex-col items-center justify-center bg-gray-200 w-full h-full">
        <h1 className="text-4xl font-bold max-w-lg">Welcome to the future</h1>
        <p className="max-w-lg">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum, quo
          maxime, quia blanditiis laborum eius saepe sed modi ipsum quis aut
          eligendi! Labore soluta doloremque rerum optio fugiat ex magnam?ß
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="w-[300px]">
          <SignUp routing="hash" />
          {/* <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSignup)}>
              <FormFieldWrapper
                form={form}
                name="first_name"
                label="First Name"
                placeholder="First Name"
                errorMessage={form.formState.errors.first_name?.message}
              />
              <FormFieldWrapper
                form={form}
                name="last_name"
                label="Last Name"
                placeholder="Last Name"
                errorMessage={form.formState.errors.last_name?.message}
              />
              <FormFieldWrapper
                form={form}
                name="email"
                label="Email Address"
                placeholder="Email Address"
                errorMessage={form.formState.errors.email?.message}
              />
              <FormFieldWrapper
                form={form}
                name="password"
                label="Password"
                placeholder="Password"
                errorMessage={form.formState.errors.password?.message}
              />
              <Button
                type="submit"
                className="mt-4 w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form> */}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
