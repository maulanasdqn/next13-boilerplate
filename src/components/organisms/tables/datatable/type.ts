import { TMetaItem } from "@/entities";
import { ColumnDef } from "@tanstack/react-table";
import { ChangeEventHandler } from "react";

export type TDataTable<T extends Record<string, unknown>> = {
  data: T[];
  meta?: TMetaItem;
  columns: ColumnDef<T>[];
  createLink?: string;
  isLoading?: boolean;
  handleSearch: ChangeEventHandler<HTMLInputElement>;
};
