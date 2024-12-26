"use client";

import { Typography } from "@material-tailwind/react";

const MapSection = () => {
  return (
    <section className="relative h-screen w-full" >
      <div className="absolute top-0 left-0 w-full h-full  flex flex-col items-center lg:items-start justify-center lg:w-1/2  z-10 px-6" >
        <div className="items-stretch text-center lg:text-left bg-brown-100 rounded-xl p-4 dark:bg-gray-800 "data-aos="fade-up"
                        data-aos-duration="3000">
          <Typography variant="h5" className="font-poppins items-center font-bold text-brown-200 mb-4">
            Visit Our Clinic
          </Typography>
          <Typography variant="lead" className="font-poppins  text-lg text-white " >
            140, Main Boulevard, DHA Phase 6, Lahore
          </Typography>
        </div>
      </div>
      <div className="absolute inset-0 w-full h-full">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2700.5987531850865!2d74.45163998966972!3d31.481803671664682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391909f29856b9b5%3A0x2e9abc152e208e35!2s7%20Oaks%20Dental%20Practice!5e0!3m2!1sen!2sus!4v1726494409703!5m2!1sen!2sus" width="600" className="absolute inset-0 w-full h-full" height="450"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </section>
          
  );
};

export default MapSection;
