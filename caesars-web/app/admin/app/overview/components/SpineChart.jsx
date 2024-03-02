import React from "react";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "./ChartsDynamicColor";

const Spinearea = ({ dataColors }) => {
  const spineareaChartColors = getChartColorsArray(dataColors);

  const series = [
    {
      name: "Total Matches",
      data: [10, 20, 6, 5, 12, 9, 10],
    },

  ];

  const options = {
    dataLabels: {
    //   enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 5,
    },

    colors: spineareaChartColors,
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00",
        "2018-09-19T01:30:00",
        "2018-09-19T02:30:00",
        "2018-09-19T03:30:00",
        "2018-09-19T04:30:00",
        "2018-09-19T05:30:00",
        "2018-09-19T06:30:00",
      ],
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height="140"
      width="400"
    />
  );
};

export default Spinearea;