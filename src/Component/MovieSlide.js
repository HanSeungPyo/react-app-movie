import React, { useRef } from 'react';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from './MovieCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MovieSlide = ({ movies, type }) => {
  const sliderRef = useRef(null);

  const isDetailType = type === "detail";
  const slidesToShow = isDetailType ? 4 : 7;
  const slidesToScroll = slidesToShow;

  const getResponsiveSettings = () => ([
    {
      breakpoint: 2000,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 950,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ]);

  const handleBeforeChange = (current, next) => {
    if (sliderRef.current?.innerSlider?.list) {
      const slideElements = sliderRef.current.innerSlider.list.querySelectorAll('.slick-slide');
      slideElements.forEach((slide) => slide.classList.remove('last-active'));
    }
  };

  const handleLastActiveClass = () => {
    if (sliderRef.current?.innerSlider?.list) {
      const slideElements = sliderRef.current.innerSlider.list.querySelectorAll('.slick-active');
      slideElements[slideElements.length - 1].classList.add('last-active');
      slideElements[0].classList.remove('last-active');
    }
  };

  const settings = {
    dots: true,
    infinite: false,
    slidesToShow,
    slidesToScroll,
    responsive: getResponsiveSettings(),
    beforeChange: handleBeforeChange,
  };

  return (
    <div className="movie-slide">
      <Slider ref={sliderRef} {...settings} afterChange={handleLastActiveClass}>
        {movies.results.map((item) => (
          <MovieCard key={item.id} item={item} />
        ))}
      </Slider>
    </div>
  );
};

export default MovieSlide;