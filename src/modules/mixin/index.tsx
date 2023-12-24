import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

export const ModuleMixin: FC<PropsWithChildren> = ({ children }) => {
  const className = clsx(
    "md:pr-6 py-12 px-6 md:pl-10 mt-7 w-full bg-gray-50 gap-y-10 flex flex-col overflow-x-auto lg:ml-60",
    {},
  );

  return (
    <div className={className}>
      <div className="w-full overflow-x-auto">{children}</div>
    </div>
  );
};
