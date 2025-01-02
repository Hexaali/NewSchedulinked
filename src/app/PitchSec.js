import React from "react";
import SecImagesCarousel from "./components/SecImagesCarousel";

const images = [
  "/1.jpg",
  "/2.jpg",
  "/3.jpg",
];
const texts = [
  { 
    title: (
      <>
        <span className="text-8xl font-bold text-white font-alexBrush ">7</span>
        <span className="text-8xl font-bold text-brown-200 font-alexBrush"> Oaks </span>
        <span className="text-8xl font-bold text-brown-200 font-alexBrush">Dental</span> 
      </>
    ),
    paragraph: "Why Settle For Less? Experience The International Standards."
  },
  { 
    title: (
      <>
        Our <span className="text-8xl font-bold text-brown-200 font-alexBrush">Ethos</span>
      </>
    ),
    paragraph: "Every patient deserves the best. "
  },
  { 
    title: (
      <>
        Building Healthy  <span className="text-brown-200 font-bold text-8xl font-alexBrush">Smiles</span> for a Bright Future
      </>
    )
  },
  { 
    title: (
      <>
        Leading <span className="text-brown-200">Doctors</span>
      </>
    ),
    paragraph: "Our doctors are dedicated to providing high-quality dental care to their patients without recommending unnecessary treatments and dental procedures. Each dental expert is committed to conservative treatment options, ensuring that patients aren’t encouraged to have more dental work than they want or need."
  }
];

const PitchSec = () => (
  <div className="relative w-full h-screen " >
    <SecImagesCarousel images={images} texts={texts} transitionDuration={5000} />
  </div>
);

export default PitchSec;
