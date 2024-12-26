import { useState, useRef } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { Typography } from '@material-tailwind/react';

const Carousel = ({ reviews }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    beforeChange: (current, next) => setActiveIndex(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4.58,
          slidesToScroll: 1,
          dots: true,
        },
      },
      
      
    ],
  };

  const getSlideClasses = (index) => {
    const slidesToShow = 3;
    const totalSlides = reviews.length;
    const centerIndex = (activeIndex + Math.floor(slidesToShow / 2)) % totalSlides;
    const virtualIndex = (index + totalSlides) % totalSlides;
    if (virtualIndex === centerIndex) {
      return 'opacity-100 scale-100';
    } else if (
      virtualIndex === (centerIndex - 1 + totalSlides) % totalSlides ||
      virtualIndex === (centerIndex + 1) % totalSlides
    ) {
      return 'opacity-20 scale-90';
    } else {
      return 'opacity-50 scale-80';
    }
  };

  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="relative">
        <Slider ref={sliderRef} {...settings}>
          {reviews.map((review, index) => (
            <a
              key={review.id}
              href={review.link}
              target="_blank"
              rel="noopener noreferrer"
              onDragStart={(e) => e.preventDefault()}
              className={`px-4 transition-opacity transform duration-300 ease-in-out ${getSlideClasses(index)}`}
            >
              <div className="flex flex-col items-center bg-brown-100 dark:bg-gray-700 dark: [hover:bg-gray-800] rounded-3xl shadow-md p-6 w-full max-w-sm mx-auto md:max-w-none">
                <div className="flex flex-col items-center text-center md:w-1/3">
                  <Image src={review.image} alt={review.name} width={70} height={70} className="rounded-full" />
                  <div className="flex items-center mt-3">
                    <Typography variant="paragraph" className="text-xs sm:text-xs font-semibold text-brown-200 mr-2 truncate ellipsis ">
                      {review.name}
                    </Typography>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, idx) => (
                        <svg
                          key={idx}
                          className="w-4 h-4 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.198a1 1 0 00.95.69h4.418c.969 0 1.371 1.24.588 1.81l-3.58 2.598a1 1 0 00-.364 1.118l1.358 4.198c.3.921-.755 1.688-1.539 1.118l-3.581-2.598a1 1 0 00-1.176 0l-3.58 2.598c-.783.57-1.838-.197-1.539-1.118l1.357-4.198a1 1 0 00-.364-1.118L2.134 9.625c-.783-.57-.381-1.81.588-1.81h4.418a1 1 0 00.95-.69l1.357-4.198z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6 md:w-2/3 text-left">
                  <Typography variant="paragraph" className="text-white text-lg leading-relaxed overflow-hidden truncate text-ellipsis whitespace-normal pt-2 h-40">
                    {review.text}
                  </Typography>
                  <div className="flex justify-end mt-4">
                    <Image src={review.platformLogo} alt="Platform Logo" width={30} height={30} />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
