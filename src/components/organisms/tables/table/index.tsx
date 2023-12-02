import { FC, ReactElement } from "react";
import { TTable } from "./type";
import { Search, Pagination, Button } from "@/components";

export const Table: FC<TTable> = (props): ReactElement => {
  return (
    <section className="shadow-md bg-white h-fit border p-4 rounded-lg w-full gap-y-4 flex flex-col overflow-x-auto">
      <div className="flex justify-between items-center">
        <Search {...props} />
        <Button variant="cancel" size="sm">
          + Tambah Data
        </Button>
      </div>
      <table {...props} className="border rounded-lg p-2 w-full overflow-x-auto">
        {props.children}
      </table>
      <Pagination {...props} />
    </section>
  );
};
