import { TextField } from "@/components";
import { FC, ReactElement } from "react";
import { TSearch } from "./type";
import { IoMdSearch } from "react-icons/io";

export const Search: FC<TSearch> = (props): ReactElement => {
  return (
    <section className="flex items-center">
      <TextField
        type="search"
        preppend={<IoMdSearch className="text-gray-400" size="1.5em" />}
        variant="md"
        placeholder={props.placeholder || "Cari data..."}
        onChange={props.onChange}
      />
    </section>
  );
};
