"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Typography } from '@material-tailwind/react';
import CountUp from 'react-countup';

const CountUpC = ({ stats }) => {
  const [isInView, setIsInView] = useState(false); 
  const countUpRef = useRef(null); 

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true); 
          observer.disconnect(); 
        }
      },
      { threshold: 0.5 } 
    );

    if (countUpRef.current) {
      observer.observe(countUpRef.current);
    }

    return () => {
      observer.disconnect(); 
    };
  }, []);

  return (
    <section ref={countUpRef} className="container mx-auto bg-brown-100 dark:bg-gray-700 text-center rounded-3xl">
      <div className=" grid grid-cols-2 md:grid-cols-3 relative gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center p-4"
          >
            <Typography variant='h1' className="text-brown-200 font-poppins lg:text-5xl text-2xl">
              {isInView && ( 
                <CountUp start={0} end={stat.value} duration={3} delay={0} />
              )}
              {stat.hasPlusSign && '+'}
            </Typography>
            <Typography variant='lead' className="mt-2 font-poppins text-bold text-xs lg:text-lg text-brown-200">
              {stat.label}
            </Typography>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CountUpC;
