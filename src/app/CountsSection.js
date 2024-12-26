"use client"
import React from 'react';
import CountUpC from './components/CountUpC';
import { Typography } from '@material-tailwind/react';

const CountsSection = () => {
  const statsData = [
    { label: "Smiles Transformed", value: 500, hasPlusSign: true },
    { label: "Patient Satisfaction Rate", value: 100, hasPlusSign: true },
    { label: "Patients Every Day", value: 50, hasPlusSign: true },
    { label: "Dentistry Accuracy", value: 100 },
    { label: "Happy Patients Treated", value: 100 ,hasPlusSign: true},
    { label: "Years of Combined Expertise", value: 6, hasPlusSign: true },
  ];


  return (
    <div className="relative py-20 dark:bg-gray-900">
      <div className="flex items-center justify-center py-8">
        <Typography
          data-aos="fade-down" data-aos-duration="3000"
          variant="h5"
          className="font-poppins whitespace-nowrap xs:text-lg sm:text-2xl md:text-xl lg:text-5xl xl:text-5xl font-bold text-brown-300"
        >
          Our Numbers Speak for Themselves
        </Typography>
      </div>
      <div className=" w-4/5 mx-auto ">
        <CountUpC stats={statsData} />
      </div>
    </div>
  );
};

export default CountsSection;
