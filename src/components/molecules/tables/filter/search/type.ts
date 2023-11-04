import { ChangeEventHandler } from "react";

export type TSearch = {
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};
