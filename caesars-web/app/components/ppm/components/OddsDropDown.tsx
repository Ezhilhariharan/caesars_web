import { Dropdown, MenuProps } from "antd";
import React from "react";

import Image from "next/image";
import angleDownArrow from "../../../assets/icons/arrow-down.svg";

type Props = {
  selectedOdds: any;
  onOddsItemChange: (selectedOdds: string, newOdds: string) => void;
  // allow to update the market
  allow?: boolean;

  loading?: boolean;
};

const OddsDropDown = (props: Props) => {
  const { selectedOdds, loading, onOddsItemChange, allow } = props;

  const oddsItems: MenuProps["items"] = [
    {
      key: "0",
      label: <div>Decimal Odds</div>,
      onClick: async () => onOddsItemChange(selectedOdds, "Decimal Odds"),
    },
    {
      key: "1",
      label: <div>American Odds</div>,
      onClick: async () => onOddsItemChange(selectedOdds, "American Odds"),
    },
  ];
  return (
    <div
      className={`w-full group ${
        loading ? "cursor-not-allowed" : " cursor-pointer"
      }`}
    >
      <Dropdown
        trigger={loading ? [] : ["click", "hover"]}
        menu={{ items: oddsItems }}
      >
        <div
          className={`flex items-center justify-center px-3 py-2 ${
            loading ? "cursor-not-allowed" : " cursor-pointer"
          }`}
        >
          <span className="pr-2 text-sm font-medium text-[#282E38] transition-all duration-300 ease-linear">
            {selectedOdds}
          </span>
          <Image
            src={angleDownArrow}
            alt=""
            className="w-auto transition-all duration-300 ease-linear group-hover:rotate-180"
          />
        </div>
      </Dropdown>
    </div>
  );
};

export default OddsDropDown;
