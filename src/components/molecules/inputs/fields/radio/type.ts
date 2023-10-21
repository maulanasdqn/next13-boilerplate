import { TField, TOption } from "@/components";

export type TRadioField = Omit<TField, "type" | "onChange" | "value"> & {
  value?: TOption;
  options?: Array<TOption>;
  onChange?: (option: TOption | null) => void;
};
