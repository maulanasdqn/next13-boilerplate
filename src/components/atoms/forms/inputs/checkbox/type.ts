import { TInput } from "@/entities";

export type TInputCheckbox = Omit<TInput, "type" | "size">;
