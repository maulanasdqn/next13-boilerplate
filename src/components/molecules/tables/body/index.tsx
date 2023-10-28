import { flexRender } from "@tanstack/react-table";
import { ReactElement } from "react";
import { TTableBody } from "./type";

export const TableBody = <T extends Record<string, unknown>>(
  props: TTableBody<T>,
): ReactElement => {
  return (
    <tbody>
      {props.tableBody.rows.map((row) => (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell, index) => (
            <td key={index} className="neo__table__td">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
