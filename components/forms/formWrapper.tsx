import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import { Input } from "../ui/input";

type FormWrapperProps = {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
  errorMessage?: string;
};

const FormFieldInputWrapper = ({
  form,
  name,
  label,
  placeholder,
  errorMessage,
}: FormWrapperProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input {...field} placeholder={placeholder} />
            </FormControl>
            <FormMessage>{errorMessage}</FormMessage>
          </FormItem>
        );
      }}
    ></FormField>
  );
};

export default FormFieldInputWrapper;
