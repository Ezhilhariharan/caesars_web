import React from 'react';
import Title from '../title/Title';

type CardHeaderProps = {
  children: React.ReactNode;
  style?: {};
};

const CardHeader = (props: CardHeaderProps) => {
  const { children, ...prop } = props;
  return <div {...prop}>{children}</div>;
};

export default CardHeader;
