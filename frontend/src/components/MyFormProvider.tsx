import { ReactNode } from "react";
import { FormProvider as Form, UseFormReturn } from "react-hook-form";

export type Props = {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
  id?: string;
};

export default function MyFormProvider({
  children,
  onSubmit,
  methods,
  id,
}: Props) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} autoComplete="new-password">
        {children}
      </form>
    </Form>
  );
}
