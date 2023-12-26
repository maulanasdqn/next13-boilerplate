import { TCommonForms, TTextArea } from "@/entities";

export type TFieldTextArea = TTextArea & Omit<TCommonForms, "text">;
