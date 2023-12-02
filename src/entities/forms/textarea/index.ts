import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

export type TTextArea = Omit<
  DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
  "size"
>;
