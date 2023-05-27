import React, { useRef } from 'react'
import 'react-multi-carousel/lib/styles.css';
import MovieCard from './MovieCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


//메인 슬라이드
const MovieSlide = ({movies, type}) => {
    
  const sliderRef = useRef(null);
  
  let defaltToshow=7;
  let slidesToScroll=7;
  
  if(type=="detail"){
    defaltToshow=4;
    slidesToScroll=4;
  }
  
  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: defaltToshow,
    slidesToScroll: slidesToScroll,
    responsive: [
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
    ],
    beforeChange: (current, next) => {
      const slider = sliderRef.current;
      if (slider && slider.innerSlider && slider.innerSlider.list) {
        const slideElements = slider.innerSlider.list.querySelectorAll('.slick-slide');
        slideElements.forEach((slide) => {
          slide.classList.remove('last-active');
        });
      }
    },
  };
  
  const lastActiveClassSearch = (event) => {
    const slider = sliderRef.current;
    if(slider && slider.innerSlider && slider.innerSlider.list) {
        const slideElements = slider.innerSlider.list.querySelectorAll('.slick-active');
        const firstSibling = slideElements[0];
        const lastSibling = slideElements[slideElements.length - 1];

        lastSibling.className = 'slick-slide slick-active last-active';
        firstSibling.className = 'slick-slide slick-active';
    }
   
  };

  

  return (
    <div className="movie-slide">
      <Slider ref={sliderRef} {...settings}>
         {movies.results.map((item)=><MovieCard key={item}  item={item}
          lastActiveClassSearch={lastActiveClassSearch}
        />)}   
      </Slider>  
    </div>
  )
}

export default MovieSlide