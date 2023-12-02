import { TCommonForms, TTextArea } from "@/entities";

export type TTextAreaProps = TTextArea & Pick<TCommonForms, "size" | "status">;
