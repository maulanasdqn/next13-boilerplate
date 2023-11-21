import { TCommonForms, TInput } from "@/entities";

export type TFieldText = TInput & Omit<TCommonForms, "text">;
