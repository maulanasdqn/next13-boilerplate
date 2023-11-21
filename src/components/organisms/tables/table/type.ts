import { TMetaItem } from "@/entities";
import { ChangeEventHandler, DetailedHTMLProps, HTMLAttributes } from "react";

export type TTable = DetailedHTMLProps<HTMLAttributes<HTMLTableElement>, HTMLTableElement> & {
  meta?: TMetaItem;
  handleSearch?: ChangeEventHandler<HTMLInputElement>;
};
