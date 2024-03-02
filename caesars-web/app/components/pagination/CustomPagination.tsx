import React from 'react';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import fullLeftArrow from '../../assets/icons/full-left-arrow.svg';
import fullRightArrow from '../../assets/icons/full-right-arrow.svg';
import Image from 'next/image';
import './pagination.css';

type Props = {
  currentPage?: any;
  setCurrentPage?: React.Dispatch<React.SetStateAction<any>>;
  pageSize?: any;
  total?: any;
  prevPage?: () => void;
  nextPage?: () => void;
  onChange?: (page: number, pageSize: number) => void;
  style?: {};
};

const CustomPagination = ({
  currentPage,
  setCurrentPage,
  pageSize,
  total,
  onChange,
  ...prop
}: Props) => {
  const itemRender: PaginationProps['itemRender'] = (
    _,
    type,
    originalElement
  ) => {
    if (type === 'prev') {
      return (
        <div className='w-[120px] border border-[#D0D5DD] text-sm font-medium text-[#344054] flex items-center justify-center rounded-lg h-10 gap-3 mr-[150px]'>
          <Image src={fullLeftArrow} alt='left arrow' />
          <p>Previous</p>
        </div>
      );
    }
    if (type === 'next') {
      return (
        <div className='w-[120px] border border-[#D0D5DD] text-sm font-medium text-[#344054] flex items-center justify-center rounded-lg h-10 gap-3 ml-[200px]'>
          <p>Next</p>
          <Image src={fullRightArrow} alt='left arrow' />
        </div>
      );
    }
    return originalElement;
  };

  // const onChange: PaginationProps['onChange'] = (page) => {
  //   setCurrentPage?.(page);
  // };

  return (
    <Pagination
      itemRender={itemRender}
      pageSize={pageSize}
      current={currentPage}
      total={total}
      showSizeChanger={false}
      onChange={onChange}
    />
  );
};

export default CustomPagination;
