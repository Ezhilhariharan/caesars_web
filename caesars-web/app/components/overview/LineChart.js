import React, { useEffect, useRef } from "react";
import { get } from "@/app/apiIntegrations/fetcher";
const LineChart = ({
  data,
  weekData = [
    "Week 1",
    "Week 2",
    "Week 3",
    "Week 4",
    "Week 5",
    "Week 6",
    "Week 7",
  ],
  xAxisLabel = "Week",
  yAxisLabel = "Tasks Completed",
}) => {
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 450 - margin.left - margin.right;
    const height = 140 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Define scales
    const xScale = d3.scaleBand().domain(weekData).range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d)])
      .nice()
      .range([height, 0]);

    const lineGenerator = d3
      .line()
      .x((d, i) => xScale(weekData[i]))
      .y((d) => yScale(d))
      .curve(d3.curveCardinal); // Use curveCardinal for smooth curves

    // X-axis line
    svg
      .append("line")
      .attr("x1", 0)
      .attr("y1", height)
      .attr("x2", width)
      .attr("y2", height)
      .style("stroke", "black");

    // Y-axis line
    svg
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", height)
      .style("stroke", "black");

    svg
      .append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", lineGenerator)
      .style("fill", "none")
      .style("stroke", "black")
      .attr("stroke-width", 3);

    // Add circles for data points
    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => xScale(weekData[i]))
      .attr("cy", (d) => yScale(d))
      .style("stroke", "#4285F4")
      .attr("stroke-width", 4)
      .attr("r", 6) // Adjust the radius of the circles
      .style("fill", "white");

    // X-axis label
    svg
      .append("text")
      .attr("class", "x-axis-label")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom)
      .text(xAxisLabel);

    // Y-axis label
    svg
      .append("text")
      .attr("class", "y-axis-label")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -margin.left)
      .text(yAxisLabel);
  }, [data, weekData, xAxisLabel, yAxisLabel]);

  return <svg ref={svgRef}></svg>;
};

export default LineChart;
