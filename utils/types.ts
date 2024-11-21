import { z } from "zod";

export type accountType = {
  userId: string;
  email_address: string;
};

export type linkAccountType = {
  accountId: string;
};

export const signupSchema = z.object({
  first_name: z
    .string()
    .min(1)
    .regex(/^[a-zA-Z]{1,16}$/i, "Invalid first name"),
  last_name: z
    .string()
    .min(1)
    .regex(/^[a-zA-Z]{1,16}$/i, "Invalid last name "),
  email: z
    .string()
    .email()
    .regex(
      /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim,
      "Invalid email provided"
    ),
  password: z
    .string()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{minlength,maxlength}$/,
      "Password must be between 8 and 18 characters long and must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
    ),
});

export type SignupSchema = z.infer<typeof signupSchema>;
