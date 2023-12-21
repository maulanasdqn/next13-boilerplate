import { PropsWithChildren } from "react";
import { DashboardMixin } from "./mixin";

const DashboardTemplate = (props: PropsWithChildren) => {
  return (
    <section className="flex bg-gray-50 w-full h-auto overflow-x-auto no-scrollbar">
      <DashboardMixin>{props.children}</DashboardMixin>
    </section>
  );
};

export default DashboardTemplate;
