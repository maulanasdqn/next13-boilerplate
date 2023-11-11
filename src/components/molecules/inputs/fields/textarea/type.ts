import { TField } from "@/components";

export type TTextAreaField = Omit<TField<HTMLTextAreaElement>, "append" | "preppend">;
