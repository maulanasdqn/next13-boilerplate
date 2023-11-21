import { FieldText } from "@/components";
import { FC, ReactElement } from "react";
import { TSearch } from "./type";
import { IoMdSearch } from "react-icons/io";

export const Search: FC<TSearch> = (props): ReactElement => {
  return (
    <FieldText
      type="search"
      preppend={<IoMdSearch className="text-gray-400" size="1.5em" />}
      size="md"
      placeholder={props.placeholder || "Cari data..."}
      onChange={props.handleSearch}
    />
  );
};
