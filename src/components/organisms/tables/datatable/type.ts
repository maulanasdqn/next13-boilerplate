import { TMetaItem } from "@/entities";
import { ColumnDef } from "@tanstack/react-table";

export type TDataTable<T extends Record<string, unknown>> = {
  data: T[];
  meta?: TMetaItem;
  columns: ColumnDef<T>[];
  createLink?: string;
};
