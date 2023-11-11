import { TField } from "@/components";

export type TRadioField = Omit<
  TField<HTMLInputElement>,
  "type" | "onChange" | "append" | "preppend"
> & {
  options?: Array<{
    label: string;
    value: string | number | boolean;
  }>;
  onChange?: (option: string | number | boolean) => void;
  direction?: "row" | "column";
};
