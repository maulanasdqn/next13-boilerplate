import { ChangeEvent, FC } from "react";
import { TTableWrapper } from "./type";
import { Search } from "@/components";

export const TableWrapper: FC<TTableWrapper> = (props) => {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  return (
    <section className="shadow-md p-4 rounded-lg w-full gap-y-4 flex flex-col">
      <Search onChange={handleSearch} />
      <table className="border rounded-lg p-2">{props.children}</table>
    </section>
  );
};
