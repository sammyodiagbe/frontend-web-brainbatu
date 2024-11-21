"use client";
import { Form } from "@/components/ui/form";
import useAuthHook from "@/hooks/useAuthHooks";
import { Button } from "@/components/ui/button";
import FormFieldWrapper from "@/components/forms/formWrapper";
const SignupPage = () => {
  const { form, handleSignup } = useAuthHook();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div></div>
      <div>
        <h1 className="text-2xl font-bold">Create an account</h1>
        <div>
          <Form {...form}>
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
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
