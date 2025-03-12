/* eslint-disable no-unused-vars */
import { useState } from "react";
import Chart from "react-apexcharts";

export default function SummaryChart() {
  const [series, setSeries] = useState([
    {
      name: "items",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 200, 130, 110],
    },
  ]);

  const options = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#F9A109", "#56CCF2"],
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Product Trends by Month",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
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
      ],
    },
  };

  const renderLineChart = (
    <Chart options={options} series={series} type="line" height={350} />
  );
  return (
    <div className=" select-none ">
      <h2 className="mb-4 text-xl font-semibold">Yearly Summary</h2>
      <div className=" border-2 text-xs">{renderLineChart}</div>
    </div>
  );
}
