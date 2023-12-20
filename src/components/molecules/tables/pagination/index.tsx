import { FC, ReactElement } from "react";
import { TPagination } from "./type";
import { Button, FieldSelect } from "@/components";
import { parseAsInteger, useQueryState } from "next-usequerystate";

export const Pagination: FC<TPagination> = (props): ReactElement => {
  const { meta } = props;
  const [page, setPage] = useQueryState("page", parseAsInteger);
  const [perPage, setPerPage] = useQueryState("perPage", parseAsInteger);

  const totalPage = Number(meta?.totalPage) || 0;
  const currentPage = Number(meta?.page) || 1;
  const maxButtons = 5;
  const halfMaxButtons = Math.floor(maxButtons / 2);

  let startPage = Math.max(currentPage - halfMaxButtons, 1);
  let endPage = Math.min(startPage + maxButtons - 1, totalPage);

  if (endPage - startPage < maxButtons - 1) {
    startPage = Math.max(endPage - maxButtons + 1, 1);
  }

  return (
    <div className="flex justify-start gap-x-2">
      <Button onClick={() => setPage(1)} variant="cancel" size="sm">
        {"<<"}
      </Button>

      <Button
        onClick={() => Number(page) > 1 && setPage(Number(page) - 1)}
        variant="cancel"
        size="sm"
      >
        Prev
      </Button>

      {Array.from({ length: Math.min(maxButtons, totalPage) }, (_, i) => (
        <Button
          onClick={() => setPage(startPage + i)}
          key={startPage + i}
          variant={startPage + i === currentPage ? "secondary" : "cancel"}
          size="sm"
        >
          {startPage + i}
        </Button>
      ))}

      <Button
        onClick={() => Number(page) < Number(meta?.totalPage) && setPage(Number(page) + 1)}
        variant="cancel"
        size="sm"
      >
        Next
      </Button>

      <Button onClick={() => setPage(Number(meta?.totalPage))} variant="cancel" size="sm">
        {">>"}
      </Button>
      <div className="w-fit">
        <FieldSelect
          placeholder="Per Page"
          value={perPage}
          onChange={(e) => setPerPage(Number(e))}
          options={Array.from({ length: totalPage }, (_, i) => ({
            label: String(i * 10),
            value: String(i * 10),
          }))}
        />
      </div>
    </div>
  );
};
