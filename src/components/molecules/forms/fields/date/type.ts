import { TDatePicker } from "@/components/atoms/forms/inputs/date/type";
import { TCommonForms } from "@/entities";

export type TFieldDate = TDatePicker & Omit<TCommonForms, "text">;
