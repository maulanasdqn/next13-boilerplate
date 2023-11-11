import { TField } from "@/components";

export type TCheckboxField = Omit<TField<HTMLInputElement>, "append" | "preppend"> & {
  text?: string;
};
