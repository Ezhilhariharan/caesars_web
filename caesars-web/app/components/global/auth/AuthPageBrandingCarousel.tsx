import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import tokenPageCarouselImage1 from '../../../assets/tokenPageCarouselImage1.svg';
import tokenPageCarouselImage2 from '../../../assets/tokenPageCarouselImage2.svg';
import tokenPageCarouselImage3 from '../../../assets/tokenPageCarouselImage3.svg';
import SliderContainer from '../slider/SliderContainer';
// import "slick-carousel/slick/slick.css";

type Props = {};

const AuthPageBrandingCarousel = (props: Props) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className='w-[500px] h-[500px] pt-10 overflow-hidden'>
      <SliderContainer
        slideToShow={1}
        slideToScroll={1}
        dots={false}
        autoplay={true}
        infinite={true}
      >
        <div>
          <Image
            src={tokenPageCarouselImage1}
            alt='tokenPageCarouselImage1'
            width={500}
          />
        </div>
        <div>
          <Image
            src={tokenPageCarouselImage2}
            alt='tokenPageCarouselImage1'
            width={500}
          />
        </div>
        <div>
          <Image
            src={tokenPageCarouselImage3}
            alt='tokenPageCarouselImage1'
            width={500}
          />
        </div>
      </SliderContainer>
    </div>
  );
};

export default AuthPageBrandingCarousel;
