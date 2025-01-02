"use client";

import { Typography } from "@material-tailwind/react";
import { InfoCard } from "./components/InfoCard";

const teamMembers = [
  {
    imageSrc: "/image2.jpg",
    name: "Dr. Omer Bin Zahid",
    title: "Dr. Omer Bin Zahid is a dedicated dental professional with a passion for creating healthy, confident smiles. A graduate of de'Montmorency College of Dentistry, he further honed his expertise with a postgraduate qualification from the Royal College of Surgeons in Ireland, and has a special interest in endodontics and restorative dentistry. Dr. Omer’s patient-centered approach and commitment to excellence ensure every treatment is delivered with precision, care, and compassion.",
  },
  {
    imageSrc: "/Dajwa.jpg",
    name: "Dr. Ajwa Rehman",
    title: "Dr. Ajwa Rehman is a skilled dentist committed to transforming smiles with precision and care. A graduate of de'Montmorency College of Dentistry, she pursued her postgraduate degree at the Royal College of Surgeons in Ireland. She has a special interest in Orthodontics. With a keen eye for detail and a passion for creating balanced, beautiful smiles, Dr. Ajwa ensures her patients feel confident every step of the way.",
  },
  {
    imageSrc:"/image1.jpg",
    name: "Ahsan Nadeem",
    title: "As the hygienist at 7 Oaks Dental Practice, Ahsan Nadeem plays a vital role in maintaining the oral health of our patients. With his gentle approach and expertise in preventive care, Ahsan helps patients achieve healthier smiles through personalised cleaning treatments and education on maintaining excellent dental hygiene at home. ",
  }

];

const TeamSection = () => {
  return (
    <section id="team" className= "dark:bg-gray-900 py-8 min-h-screen">
      <div className="flex flex-col justify-items-center container mx-auto px-4 py-8 text-center">
        <Typography
          variant="h5"
          className="font-poppins pb-2 text-2xl text-brown-200"
          data-aos="fade-down"
          data-aos-duration="3000"
        >
          Meet the Experts Behind Your Smile
        </Typography>
        
        <Typography
          variant="paragraph"
          className="font-poppins lg:text-lg py-4 px-24 text-blue-gray-800 dark:text-white"
          data-aos="fade-down"
          data-aos-duration="3000"
        >
          At 7 Oaks Dental Practice, our team of highly skilled professionals is committed to bringing the latest dental expertise to our patients.
        </Typography>
      </div>
      <div className="flex justify-center" data-aos="fade-up" data-aos-duration="3000">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 justify-items-center py-2">
          {teamMembers.map((member, index) => (
            <InfoCard
              key={index}
              imageSrc={member.imageSrc}
              name={member.name}
              title={member.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
