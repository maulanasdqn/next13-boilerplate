import { TCommonForms, TInput } from "@/entities";

export type TFieldCheckbox = Omit<TInput, "size" | "type"> &
  Omit<TCommonForms, "preppend" | "append">;
