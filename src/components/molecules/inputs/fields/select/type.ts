import { TField } from "@/components";

export type TSelectField = TField<HTMLSelectElement> & {
  options?: Array<{
    label: string;
    value: string | number;
  }>;
};
