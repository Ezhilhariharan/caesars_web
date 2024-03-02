import React from "react";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "./ChartsDynamicColor";

const DashedLine = ({ dataColors,data }) => {
//   const dashedLineChartColors = getChartColorsArray(dataColors);

  const series = [
  
    {
      name: "Total Matches",
      data:  Object.values(data),
    },
   
  ];
  const options = {
    stroke: {
        curve: "smooth",
        width: 4,
        color:"black"
      },
    chart: { zoom: { enabled: !1 }, toolbar: { show: !1 } },
    // colors: dashedLineChartColors,
    // colors: ['#000'],
    dataLabels: { enabled: !1 },
    // stroke: { width: [3, 4, 3], curve: "straight", dashArray: [0, 8, 5] }, 
    // title: { text: "Page Statistics", align: "left" },
    markers: { 
        
        
        fillColor: '#e3e3e3',
        strokeColor: '#fff',
        size: 5,
        // size: 10, hover: { sizeOffset: 10} , fillColor: 'blue',   strokeColors: '#fff',
    },
    xaxis: {
      categories: Object.keys(data).map(d=>d.split('-')[2]),
    },
    yaxis: {
        show: false,},
    tooltip: {
      y: [
        {
          title: {
            formatter: function (e) {
              return e + " ";
            },
          },
        },
        
      ],
    },
    grid: { borderColor: "#f1f1f1" },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height="140"
      className="apex-charts"
    />
  );
};

export default DashedLine;