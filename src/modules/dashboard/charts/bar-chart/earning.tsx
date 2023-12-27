"use client";
import { ReactElement, FC, useState, useMemo, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { optionsList } from "../store";
import { Select } from "@/components";
import { FaChartArea } from "react-icons/fa";

export const ProductViewBar: FC = (): ReactElement => {
  const chartRef = useRef();
  const [chartType, setChartType] = useState<string>("harian");
  const [labels, setLabels] = useState<string[]>([]);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  );
  const options = {
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  useEffect(() => {
    if (chartType === "bulanan") {
      setLabels([
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ]);
    } else if (chartType === "harian") {
      setLabels(["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Ming"]);
    } else {
      setLabels(["Minggu-1", "Minggu-2", "Minggu-3", "Minggu-4"]);
    }
  }, [chartType]);

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Penghasilan",
        data: [40, 90, 90, 23, 45, 23, 34, 54, 65, 76, 45, 77],
        backgroundColor: "#5bc0de",
      },
    ],
  };
  return (
    <section>
      <div className="w-full rounded-lg bg-white p-4 my-2 h-fit shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex gap-x-2 items-center">
            <h1 className="text-xl font-semibold ">Penghasilan</h1>
            <span>
              <FaChartArea size={30} className="text-green-500" />
            </span>
          </div>
          <div>
            <Select
              options={optionsList}
              placeholder="Pilih filter"
              size="lg"
              onChange={(e) => setChartType(e)}
            />
          </div>
        </div>
        <div className="w-full pt-8 h-96">
          <Line ref={chartRef} datasetIdKey="id" options={options} data={data} />
        </div>
      </div>
    </section>
  );
};
