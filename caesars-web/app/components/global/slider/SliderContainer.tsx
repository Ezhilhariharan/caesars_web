'use client';
import React, { useRef } from 'react';
import Image from 'next/image';

// components
import Title from '../title/Title';
import ArrowLeft from '@/app/assets1/custom-icons/arrows/ArrowLeft';
import ArrowRight from '@/app/assets1/custom-icons/arrows/ArrowRight';

// antd
import { Carousel } from 'antd';

type sliderContainerProps = {
  title?: string;
  titleSize?: 'small' | 'medium' | 'large';
  titleStyle?: {};
  autoplay?: boolean;
  dots?: boolean;
  slideToShow: number;
  slideToScroll: number;
  arrows?: boolean;
  infinite?: boolean;
  children: React.ReactNode;
  responsive?: any[] | [];
  style?: {};
};

export default function SliderContainer(props: sliderContainerProps) {
  const {
    title,
    titleSize,
    titleStyle,
    slideToShow,
    slideToScroll,
    children,
    arrows,
    infinite,
    autoplay,
    dots,
    responsive,
    ...prop
  } = props;

  const sliderRef = useRef<any>();

  return (
    <main className='w-full relative'>
      {title && (
        <header className='h-10 mb-5 flex items-center justify-between'>
          <Title title={title} size={titleSize} style={titleStyle} />
          <div className='flex items-center'>
            <div
              className='cursor-pointer'
              onClick={() => sliderRef.current.prev()}
            >
              <ArrowLeft color='#54577A' size={24} />
            </div>
            <div
              className='cursor-pointer'
              onClick={() => sliderRef.current.next()}
            >
              <ArrowRight color='#54577A' size={24} />
            </div>
          </div>
        </header>
      )}
      <Carousel
        className='overflow-hidden w-full gap-10'
        dots={dots}
        autoplay={autoplay}
        ref={sliderRef}
        slidesToShow={slideToShow}
        slidesToScroll={slideToScroll}
        infinite={infinite}
        responsive={responsive || []}
        {...prop}
      >
        {children}
      </Carousel>
    </main>
  );
}
