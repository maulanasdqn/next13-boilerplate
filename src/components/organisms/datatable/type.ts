import { ColumnDef } from "@tanstack/react-table";

export type TDataTable<T extends Record<string, unknown>> = {
  data: T[];
  columns: ColumnDef<T>[];
};
