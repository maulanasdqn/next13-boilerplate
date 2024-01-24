import { flexRender } from "@tanstack/react-table";
import { ReactElement } from "react";
import { TTableBody } from "./type";

export const TableBody = <T extends Record<string, unknown>>(
  props: TTableBody<T>,
): ReactElement => {
  return (
    <tbody className="divide-y w-fit">
      {props.tableBody.rows.map((row) => (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell, index) => (
            <td key={index} className="border-b p-2 w-fit text-gray-600 font-medium bg-white">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
