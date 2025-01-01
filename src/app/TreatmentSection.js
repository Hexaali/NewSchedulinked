"use client";

import Image from 'next/image';
import { Typography } from '@material-tailwind/react';

const TreatmentSection = () => {
    return (
        <section className="dark:bg-gray-900 pb-8 pt-12 min-h-screen flex items-center justify-center px-4 lg:px-16">
            <div className="flex flex-col lg:flex-row items-center justify-between max-w-screen-xl w-full">
                <div className="w-full lg:w-1/2 mb-6 lg:mb-0 flex flex-col items-center lg:items-start text-center lg:text-left">
                    <Typography
                        data-aos="fade-down"
                        data-aos-duration="3000"
                        variant="h2"
                        className="font-poppins text-3xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-brown-200"
                    >
                        Painless & Modern
                    </Typography>
                    <Typography
                        data-aos="fade-down"
                        data-aos-duration="3000"
                        variant="h2"
                        className="font-poppins text-2xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-brown-300"
                    >
                        Dentistry Redefined
                    </Typography>
                    <Typography
                        data-aos="fade-up"
                        data-aos-duration="3000"
                        variant="paragraph"
                        className=" sm:text-xl md:text-2xl lg:text-lg mb-4 font-poppins text-gray-800 dark:text-white pt-10"
                    >
                        At 7 Oaks Dental Practice, we combine cutting edge technology with a patient. First approach to ensure your dental experience is seamless, comfortable, and virtually pain free. Our advanced digital Xrays and 3D imaging systems provide precise diagnostics while minimising radiation exposure, prioritising both accuracy and your safety. Understanding that dental anxiety is one of the greatest challenges patients face, we specialise in painless dentistry. Using gentle techniques, modern anaesthetics, and minimally invasive tools, we ensure your treatments are as stress free as possible.
                    </Typography>
                </div>
                <div className="w-full lg:w-1/2 flex items-center justify-center">
                    <Image
                        src="/7oaks/DentistT.png"
                        alt="Dentist"
                        width={450}
                        height={200}
                        className="lg:pl-8"
                    />
                </div>
            </div>
        </section>
    );
};

export default TreatmentSection;
