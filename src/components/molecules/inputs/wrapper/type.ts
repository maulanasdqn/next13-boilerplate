import { TField } from "@/components";

export type TInputWrapper = Omit<
  TField<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  "value" | "onChange"
> & { text?: string };
