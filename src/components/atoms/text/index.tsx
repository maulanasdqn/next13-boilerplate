import { FC, ReactElement, HTMLAttributes } from "react";

export const Text: FC<
  HTMLAttributes<HTMLHeadElement | HTMLParagraphElement>
> = (): ReactElement => {
  return <>Text</>;
};
