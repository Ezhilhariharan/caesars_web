import React from "react";
import { IconProps } from "./default-types";

export default function TickMark(props: IconProps) {
  const { color = "#14171C", size = 20, strokeWidth = "1.5" } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 11 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.54688 1L4.04688 6.5L1.54688 4"
        stroke={color}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
