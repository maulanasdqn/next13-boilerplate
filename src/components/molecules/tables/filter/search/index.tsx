import { FieldText } from "@/components";
import { FC, ReactElement } from "react";
import { TSearch } from "./type";
import { IoMdSearch } from "react-icons/io";

export const Search: FC<TSearch> = (props): ReactElement => {
  return (
    <div className="w-fit">
      <FieldText
        type="search"
        preppend={<IoMdSearch className="text-gray-400" size="1em" />}
        size="sm"
        placeholder={props.placeholder || "Cari data..."}
        onChange={props.handleSearch}
      />
    </div>
  );
};
