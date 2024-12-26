"use client";
import { Typography } from "@material-tailwind/react";

// import { MyButton } from "../app/Components/MyButton";

const textContent = [
  { variant: "h3", text: "Our Story", color: "text-brown-200", size: "text-2xl xs:text-xl py-2 font-serif" },
  { variant: "h2", text: "The Heart Behind Every Smile", color: "text-brown-300", size: "lg:text-4xl text-2xl pb-4 font-serif" },
  { variant: "paragraph", text: "7 Oaks Dental Practice was born from a dream—a vision to redefine dentistry in Pakistan and bring world-class care to a community where it’s often overlooked. With a deep commitment to excellence and an unwavering passion for patient care, we set out to create more than just a dental clinic. We aspired to build a space where trust, comfort, and quality intersect to transform lives, one smile at a time.Founded with the belief that everyone deserves access to exceptional dental care, 7 Oaks Dental Practice is our answer to a system that often prioritizes quantity over quality. We envisioned a place where patients are treated with empathy, where every treatment is tailored to the individual, and where the highest standards of care are not a luxury but a given.Our journey began with the understanding that a healthy smile isn’t just about aesthetics—it’s about confidence, well-being, and a better quality of life. This belief drives us every day to push boundaries, invest in cutting-edge technology, and stay at the forefront of modern dentistry. At 7 Oaks, we’re more than just a practice; we’re a family dedicated to making a difference. Every patient who walks through our doors becomes part of this story—a story of hope, care, and the pursuit of excellence. This is our journey, and we’re honoured to be part of yours. Welcome to 7 Oaks Dental Practice, where every smile matters.", color: "text-justify [text-align-last:center] px-8 text-gray-800 dark:text-white" }
];

const DescriptionSec = () => {
  return (
    <section className= "dark:bg-gray-900 py-2 flex min-h-screen items-center justify-center">
      <div className="container mx-auto flex flex-col items-center justify-center gap-8">
        {textContent.map((item, index) => (
          <Typography key={index} variant={item.variant} className={`${item.color} ${item.size} font-poppins ${item.align || ''}`} data-aos="zoom-in" data-aos-duration="2000">
            {item.text}
          </Typography>
        ))}
        {/* <div className="w-full flex justify-center pt-8">
          <MyButton
            btnText="Read More"
            buttonClasses="bg-brown-100 text-brown-200 hover:bg-brown-200 hover:text-brown-100"
          />
        </div> */}
      </div>
    </section>
  );
};

export default DescriptionSec;
