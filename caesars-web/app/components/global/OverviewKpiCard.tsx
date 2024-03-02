import Image from "next/image";

// components
import CardContainer from "@/app/components/global/cardContainer/CardContainer";

type OverviewKpiCardProps = {
  icon: any;
  title: string;
  value: string | number;
  subtitle: string;
};

export default function OverviewKpiCard(props: OverviewKpiCardProps) {
  const { icon, title, value, subtitle } = props;

  return (
    <CardContainer cardClassName="h-[226px] px-5 py-8 rounded-[15px]">
      <Image src={icon} alt={"logo"} style={{ marginBottom: 20 }} />
      <div
        className="text-xs font-medium text-[#54577A] -tracking-[0.02em] mb-2.5"
        style={{
          fontWeight: 500,
          fontSize: 12,
          letterSpacing: "-0.02em",
          color: "#54577A",
          marginBottom: 10,
        }}
      >
        {title}
      </div>
      <div className="text-2xl font-medium text-[#000000] leading-[29px] mb-2.5">
        {value}
      </div>
      <div className="text-xs font-normal text-[#54577A] -tracking-[0.02em] leading-[17px] mb-[30px]">
        {subtitle}
      </div>
    </CardContainer>
  );
}
