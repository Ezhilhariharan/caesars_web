import React from "react";
import CardHeader from "./CardHeader";

type CardBodyProps = {
  children: React.ReactNode;
  style?: {};
};

const CardBody = (props: CardBodyProps) => {
  const NewComponent = () => {
    const { children, ...prop } = props;
    return <CardHeader children={children} {...prop} />;
  };
  return <NewComponent />;
};

export default CardBody;
