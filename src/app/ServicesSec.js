"use client";

import MyCard from './components/MyCard';
import { Typography } from '@material-tailwind/react';

const cardData = [
    { imageSrc: '/implant.png', altText: 'Implant Logo', title: 'General Dentistry' },
    { imageSrc: '/ortho.png', altText: 'Cosmetic Dentistry Logo', title: 'Cosmetic Dentistry' },
    { imageSrc: '/Cosmetic.png', altText: 'Restorative Dentistry Logo', title: 'Restorative Dentistry' },
    { imageSrc: '/noun-teeth.png', altText: 'Orthodontics Logo', title: 'Orthodontics' },
    { imageSrc: '/rootcanal.png', altText: 'Endodontics Logo', title: 'Endodontics' },
    { imageSrc: '/Crown.png', altText: 'Periodontics Logo', title: 'Periodontics' },
    { imageSrc: '/cavity.png', altText: 'Pediatric Dentistry Logo', title: 'Pediatric Dentistry' },
    { imageSrc: '/oralll.png', altText: 'Oral Surgery Logo', title: 'Oral Surgery' },
];

const ServicesSec = () => {
    return (
        <section
            id="procedures"
            className="py-8 bg-gray-100 dark:bg-gray-900 dark:text-gray-100 flex items-center justify-center min-h-screen"
        >
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-8">
                {/* Left Text Section */}
                <div
                    className="lg:w-1/4 flex items-center justify-center text-center"
                    data-aos="zoom-in-right"
                    data-aos-duration="2000"
                    >
                    <Typography
                        as="li"
                        variant="h4"
                        className="font-poppins text-xl sm:text-2xl md:text-4xl text-brown-100 dark:text-white transition-colors"
                        >
                        Equipped with
                        <span className="text-brown-200 dark:text-brown-200 font-alexBrush text-4xl block pt-2">
                            Advanced Dental
                        </span>
                        Equipments.
                    </Typography>
                </div>

                {/* Card Grid */}
                <div
                    className="flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                    data-aos="zoom-in-left"
                    data-aos-duration="2000"
                >
                    {cardData.map((card, index) => (
                        <MyCard
                            key={index}
                            imageSrc={card.imageSrc}
                            altText={card.altText}
                            title={card.title}
                            data-aos="zoom-in"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSec;
