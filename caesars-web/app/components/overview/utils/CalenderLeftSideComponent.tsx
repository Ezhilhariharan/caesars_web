import Image from "next/image";
import arrowLeft from "../../../assets/icons/arrow-left.svg";

type DateProp = {
  onChange: () => void;
};

const CalenderLeftSideComponent = (props: DateProp) => {
  const { onChange } = props;
  return (
    <button className="w-5 h-5" onClick={onChange}>
      <Image src={arrowLeft} alt="arrow-left" />
    </button>
  );
};

export default CalenderLeftSideComponent;
