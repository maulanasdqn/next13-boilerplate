import { FieldText } from "@/components";
import { ChangeEvent, FC, ReactElement, useRef } from "react";
import { TSearch } from "./type";
import { IoMdSearch } from "react-icons/io";

export function debounce<F extends (...args: any[]) => any>(
  func: F,
  waitFor: number,
): (...args: Parameters<F>) => ReturnType<F> {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<F>): ReturnType<F> => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
    return undefined as unknown as ReturnType<F>;
  };
}

export const Search: FC<TSearch> = (props): ReactElement => {
  const debouncedOnChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    props.handleSearch?.(e);
  }, 500);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-fit">
      <FieldText
        ref={inputRef}
        type="search"
        preppend={<IoMdSearch className="text-gray-400" size="1em" />}
        size="sm"
        placeholder={props.placeholder || "Cari data..."}
        onChange={(e) => {
          e.persist();
          debouncedOnChange(e);
        }}
      />
    </div>
  );
};
