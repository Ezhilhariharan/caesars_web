import React from 'react';
import { Spin } from 'antd';

type Props = {
  text?: string;
  loading?: boolean;
  style?: {};
};

const LoadingComponent = ({ text, loading, ...prop }: Props) => {
  return (
    <div
      className='px-10 py-5 min-w-full h-full flex justify-center items-center text-base text-[#121212] gap-5'
      {...prop}
    >
      <Spin size='small' />
      {text}...
    </div>
  );
};

export default LoadingComponent;
