import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

export const ModuleMixin: FC<PropsWithChildren> = ({ children }) => {
  const isSidebarOpen = "open";
  const className = clsx(
    "pr-6 py-12 pl-10 mt-7  w-full bg-gray-50 gap-y-10 flex flex-col overflow-x-auto",
    {
      "sm:ml-60": isSidebarOpen === "open" || isSidebarOpen === "null" || !isSidebarOpen,
    },
  );

  return (
    <div className={className}>
      <div className="w-full overflow-x-auto">{children}</div>
    </div>
  );
};
