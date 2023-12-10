import { FC, ReactElement } from "react";
import { TTable } from "./type";
import { Search, Pagination, Button } from "@/components";

export const Table: FC<TTable> = (props): ReactElement => {
  return (
    <section className="shadow-md bg-white h-full border p-4 rounded-lg w-full gap-y-4 flex flex-col overflow-x-auto">
      <div className="flex gap-x-3 items-center sticky z-10 w-full">
        <Search {...props} />
        {props.createLink && (
          <Button href={props.createLink} variant="cancel" size="sm">
            + Tambah Data
          </Button>
        )}
      </div>
      <div className="overflow-x-auto min-w-max w-full h-fit flex p-1 bg-gray-50 rounded-lg relative">
        <table {...props} className="p-2 w-full">
          {props.children}
        </table>
      </div>
      <Pagination {...props} />
    </section>
  );
};
