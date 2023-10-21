import { TField, TOption } from "@/components";

export type TSelectField = TField & {
  options?: Array<TOption>;
};
