"use client"
import React from 'react'
import { Typography } from '@material-tailwind/react';
import Image from 'next/image';

const AboutUs = () => {
    return (
        <section id="aboutus" className='py-10 dark:bg-gray-900 flex items-center justify-center min-h-screen '>
            <div className="flex flex-row items-center justify-center container mx-auto">
                <div className='w-2/4' data-aos="fade-right" data-aos-duration="3000">
                    <Image src="/kayman/about.gif" className='h-90 w-90 items-center' alt='About Us' width={300} height={300} />
                </div>
                <div className="flex flex-col justify-items-center container mx-auto text-center pr-3">
                    <Typography
                        variant="h5"
                        className="font-poppins pb-2 text-5xl text-brown-200 "
                        data-aos="fade-down"
                        data-aos-duration="3000"
                    >
                        About Us
                    </Typography>
                    <Typography
                        className="whitespace-nowrap font-poppins lg:text-4xl pb-3 text-brown-300 sm:text-xl font-bold"
                        data-aos="fade-down"
                        data-aos-duration="3000"
                    >
                        7 Oaks Dental Practice
                    </Typography>
                    <Typography
                        variant="paragraph"
                        className="font-poppins lg:text-lg py-4 text-blue-gray-800 dark:text-white"
                        data-aos="fade-up"
                        data-aos-duration="3000"
                    >
                        LLLLocated in the heart of DHA Phase 6, Lahore, 7 Oaks Dental Practice is dedicated to providing international-grade dental care to Pakistan. Our mission is to deliver the highest standards in oral healthcare, ensuring our patients don’t need to settle for less. With a state-of-the-art facility and a compassionate approach, we offer comprehensive dental services ranging from routine check-ups to advanced restorative treatments.
                        We believe in creating a comfortable and stress-free environment, where cutting-edge technology meets expert care. Whether you’re looking for preventive care or cosmetic enhancements, 7 Oaks Dental Practice is here to help you achieve optimal oral health and a confident smile.
                    </Typography>
                </div>
            </div>
        </section>
    )
}
export default AboutUs;