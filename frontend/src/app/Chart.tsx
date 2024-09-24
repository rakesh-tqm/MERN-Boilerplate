import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ChartDataLabels);

const chartColors = [
  "#336699",
  "#99CCFF",
  "#999933",
  "#666699",
  "#CC9933",
  "#006666",
  "#3399FF",
  "#993300",
  "#CCCC99",
  "#666666",
  "#FFCC66",
  "#6699CC",
  "#663366",
  "#9999CC",
  "#CCCCCC",
  "#669999",
  "#CCCC66",
  "#CC6600",
  "#9999FF",
  "#0066CC",
  "#99CCCC",
  "#999999",
  "#FFCC00",
  "#009999",
  "#99CC33",
  "#FF9900",
  "#999966",
  "#66CCCC",
  "#339966",
  "#CCCC33",
  "#003f5c",
  "#665191",
  "#a05195",
  "#d45087",
  "#2f4b7c",
  "#f95d6a",
  "#ff7c43",
  "#ffa600",
  "#EF6F6C",
  "#465775",
  "#56E39F",
  "#59C9A5",
  "#5B6C5D",
  "#0A2342",
  "#2CA58D",
  "#84BC9C",
  "#CBA328",
  "#F46197",
  "#DBCFB0",
  "#545775",
];

export const BarChart = () => {
  const barChartOptions = {
    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };
  return (
    <div className="w-[100%] flex flex-col-reverse gap-4">
      <h2 className="text-2xl font-bold text-left mb-4 text-center">
        Sales Report
      </h2>
      <Bar
        data={{
          labels: ["A", "B", "C", "D", "E", "F", "G"],
          datasets: [
            {
              label: "Revenue",
              data: [450, 750, 400, 500, 1000, 560, 750],
              backgroundColor: "#0f172a",
              borderColor: "#0f172a",
              barThickness: 20,
            },
            {
              label: "Test",
              data: [350, 300, 800, 500, 600, 760, 850],
              backgroundColor: "#FF9831",
              borderColor: "#FF9831",
              barThickness: 20,
            },
          ],
        }}
        options={barChartOptions as any} // Use the options here
      />
    </div>
  );
};

export const PieChart = () => {
  const pieOptions = {
    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        display: true,
        position: "bottom",
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  const pieData = {
    maintainAspectRatio: false,
    responsive: false,
    labels: ["Successful", "Pending", "Rejected"],
    datasets: [
      {
        data: [35, 25, 40],
        backgroundColor: ["#4CBB17", "#6F8FAF", "#D22B2B"],
        hoverBackgroundColor: ["#228B22", "#6082B6", "#880808"],
      },
    ],
  };
  return (
    <div className="w-[100%] flex flex-col-reverse gap-4">
      <h2 className="text-2xl font-bold text-left mb-4 text-center">
        Lead Status
      </h2>
      <div className="w-[60%] mx-auto">
        <Pie data={pieData} options={pieOptions as any} />
      </div>
    </div>
  );
};

export const LineChart = () => {
  const doughnutChartOptions = {
    plugins: {
      // Enable the datalabels plugin
      datalabels: {
        // Display the data value on each slice
        display: true,
        // Use the value as the label
        formatter: (value: any) => value + "%",
        // forceOverride: true,
        color: "#fff",
        // Set the font size and color
        font: {
          size: 20,
        },
      },
    },
  };

  return (
    <div className="w-[60%]">
      <h2 className="text-2xl font-bold text-left mb-4 text-center">
        Mail Send
      </h2>
      <Doughnut
        data={{
          labels: ["Red", "Yellow", "Blue"],
          datasets: [
            {
              data: [10, 20, 30],
              hoverOffset: 20,
            },
          ],
        }}
        options={doughnutChartOptions}
      />
    </div>
  );
};
