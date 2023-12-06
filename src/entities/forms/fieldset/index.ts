import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { TCommonForms } from "..";

export type TOption<T = string | number> = {
  label: string;
  value: T;
};

export type TFieldSet = Omit<DetailedHTMLProps<any, any>, "size" | "type"> &
  TCommonForms &
  Pick<InputHTMLAttributes<HTMLInputElement>, "type">;
