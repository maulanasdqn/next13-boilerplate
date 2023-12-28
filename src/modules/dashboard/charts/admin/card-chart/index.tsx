"use cliet";
import { FC, ReactElement } from "react";
import { userData } from "../../store";
import { PiChartLineUpBold } from "react-icons/pi";
export const CardChartAdmin: FC = (): ReactElement => {
  return (
    <section className="flex flex-col gap-y-2 md:flex-row md:gap-x-3 bg-white w-full p-8 rounded-xl shadow-sm my-8">
      {userData.map((item, idx) => (
        <div
          key={idx}
          className="relative w-full md:w-1/3 h-full py-6 px-4 flex flex-col justify-center rounded-lg bg-primary text-white"
        >
          <h1 className="font-bold text-lg">{item.name}</h1>
          <h2 className="text-md font-semibold">{item.total}</h2>
          <span>
            <PiChartLineUpBold size={20} className="text-gray-200 absolute top-2 right-2" />
          </span>
        </div>
      ))}
    </section>
  );
};
