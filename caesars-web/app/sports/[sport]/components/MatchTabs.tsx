import { useState } from "react";
import "../sports.css";

type Props = {
  selectedTab: any;
  showTab: {
    ppm: boolean;
    stats: boolean;
    confirmation: boolean;
  };
  match?: any;
  onTabChange: (e: any) => void;
};

export default function MatchTabs({
  selectedTab,
  showTab,
  onTabChange,
  match,
}: Props) {
  //   const [selectedTab, setSelectedTab] = useState("summary");
  return (
    <div
      style={{
        display: "flex",
        borderBottom: "1px solid #EDEDED",
        padding: 5,
        paddingLeft: 10,
      }}
    >
      <div
        className={`match-details-tab ${
          selectedTab === "summary" ? "match-details-tab-active" : ""
        }`}
        onClick={(e) => {
          onTabChange("summary");
        }}
      >
        Summary
      </div>
      <div
        className={`match-details-tab ${
          selectedTab === "roster" ? "match-details-tab-active" : ""
        }`}
        onClick={(e) => {
          onTabChange("roster");
        }}
      >
        Roster
      </div>

      {showTab?.ppm === true && (
        <div
          className={`match-details-tab ${
            selectedTab === "ppm" ? "match-details-tab-active" : ""
          }`}
          onClick={() => {
            onTabChange("ppm");
          }}
        >
          Player Prop Markets
        </div>
      )}

      {showTab?.stats === true && (
        <div
          className={`match-details-tab ${
            selectedTab === "stats" ? "match-details-tab-active" : ""
          }`}
          onClick={() => {
            onTabChange("stats");
          }}
        >
          Stats
        </div>
      )}

      {showTab?.confirmation === true && (
        <div
          className={`match-details-tab ${
            selectedTab === "confirmation" ? "match-details-tab-active" : ""
          }`}
          onClick={() => {
            onTabChange("confirmation");
          }}
        >
          Confirmation
        </div>
      )}
    </div>
  );
}
