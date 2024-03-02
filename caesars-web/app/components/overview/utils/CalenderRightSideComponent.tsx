import Image from "next/image";
import arrowRight from "../../../assets/icons/arrow-right.svg";

type DateProp = {
  onChange: () => void;
};

const CalenderRightSideComponent = (props: DateProp) => {
  const { onChange } = props;

  return (
    <button className="w-5 h-5" onClick={onChange}>
      <Image src={arrowRight} alt="arrow-right" />
    </button>
  );
};

export default CalenderRightSideComponent;
