import { TCommonForms, TInput } from "@/entities";

export type TInputText = TInput & Pick<TCommonForms, "size" | "status">;
