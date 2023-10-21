import { TField } from "@/components";

export type TInputWrapper = Omit<TField, "value" | "onChange">;
