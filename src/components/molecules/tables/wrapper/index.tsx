import { FC } from "react";
import { TTableWrapper } from "./type";

export const TableWrapper: FC<TTableWrapper> = (props) => {
  return (
    <section>
      <table>{props.children}</table>;
    </section>
  );
};
