"use client";
import { ReactElement, FC, useState, useMemo, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { optionsList } from "../store";
import { Select } from "@/components";
import { PiChartBarFill } from "react-icons/pi";
export const ProductBar: FC = (): ReactElement => {
  const chartRef = useRef();
  const [chartType, setChartType] = useState<string>("harian");
  const [labels, setLabels] = useState<string[]>([]);
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  const options = {
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
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
        label: "Aqua",
        data: [40, 90, 90, 23, 45, 23, 34, 54, 65, 76, 45, 77],
        backgroundColor: "#5bc0de",
      },
      {
        label: "Es Jeruk",
        data: [12, 10, 15, 13, 20, 13, 24, 34, 22, 15, 23, 21],
        backgroundColor: "#5cb85c",
      },
      {
        label: "Samsung",
        data: [28, 80, 75, 10, 25, 10, 10, 20, 43, 61, 22, 55],
        backgroundColor: "#d9534f",
      },
      {
        label: "Jamu",
        data: [28, 80, 75, 10, 25, 10, 10, 20, 43, 61, 22, 55],
        backgroundColor: "#428bca",
      },
      {
        label: "Skincare",
        data: [28, 80, 75, 10, 25, 10, 10, 20, 43, 61, 22, 55],
        backgroundColor: "#f9f9f9",
      },
    ],
  };
  return (
    <section>
      <div className="w-full rounded-lg bg-white p-4 my-2 h-fit shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex gap-x-2 items-center">
            <h1 className="text-xl font-semibold ">Produk Teratas</h1>
            <span>
              <PiChartBarFill size={30} className="text-green-500" />
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
          <Bar ref={chartRef} datasetIdKey="id" options={options} data={data} />
        </div>
      </div>
    </section>
  );
};
