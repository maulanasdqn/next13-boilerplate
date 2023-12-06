import { TSelect } from "@/components/atoms/forms/select/type";
import { TCommonForms } from "@/entities";

export type TFieldSelect = TSelect & Omit<TCommonForms, "text">;
