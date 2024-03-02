import React from 'react';
import './title.css';

type TitleProps = {
  title?: string;
  size?: 'small' | 'medium' | 'large';
  style?: {};
};

const Title = (props: TitleProps) => {
  const { title, size, ...prop } = props;

  return (
    <h1 className={`title title--${size}`} {...prop}>
      {title}
    </h1>
  );
};

export default Title;
