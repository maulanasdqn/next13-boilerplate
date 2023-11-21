import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { TCommonForms } from "..";

export type TOption<T = string | number> = {
  label: string;
  value: T;
};

export type TFieldSet = Omit<
  DetailedHTMLProps<
    | InputHTMLAttributes<HTMLInputElement>
    | SelectHTMLAttributes<HTMLSelectElement>
    | TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >,
  "size" | "type"
> &
  TCommonForms &
  Pick<InputHTMLAttributes<HTMLInputElement>, "type">;
