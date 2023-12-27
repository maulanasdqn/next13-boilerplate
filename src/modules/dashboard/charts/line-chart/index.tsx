"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { FC, ReactElement, useEffect, useRef, useState } from "react";
import { MdShowChart } from "react-icons/md";
import { Select } from "@/components";
import { optionsList } from "../store";
export const LineChart: FC = (): ReactElement => {
  const chartRef = useRef();
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
  const [chartType, setChartType] = useState<string>("bulanan");
  const [labels, setLabels] = useState<string[]>([]);

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

  const options = {
    maintainAspectRatio: false,
    aspectRatio: 1,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: "Total Pesanan",
        borderColor: "#009647",
        backgroundColor: "#009647",
        data: [300, 250, 123, 222, 121, 234, 245, 232, 300, 123, 222, 300],
      },
      {
        label: "Total Barang",
        borderColor: "#ffd700",
        backgroundColor: "#ffd700",
        data: [250, 230, 213, 115, 121, 134, 142, 132, 212, 123, 135, 140],
      },
      {
        label: "Total Pembelian",
        borderColor: "#4633F2",
        backgroundColor: "#4633F2",
        data: [200, 232, 125, 200, 121, 100, 242, 200, 156, 120, 205, 100],
      },
    ],
  };

  return (
    <section>
      <div className="w-full rounded-lg bg-white p-4 my-2 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex gap-x-2 items-center">
            <h1 className="text-xl font-semibold ">Data Transaksi</h1>
            <span>
              <MdShowChart size={30} className="text-green-500" />
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
