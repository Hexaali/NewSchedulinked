import AboutUs from "./AboutUs";
import CountsSection from "./CountsSection";
import DescriptionSec from "./DescSection";
import MapSection from "./MapSection";
import PitchSec from "./PitchSec";
import ServicesSec from "./ServicesSec";
import TeamSection from "./TeamSection";
import Testimonials from "./Testimonials";
import TreatmentSection from "./TreatmentSection";

export const metadata = {
  title: "7 Oaks Dental",
  description: "7 Oaks Dental Practice provides international-grade dental care in Lahore, Pakistan. Offering a wide range of services to help you achieve a healthy smile.",
};

export default function Home() {
  return (
    <>
      <PitchSec/>
      <ServicesSec/>
      <DescriptionSec/>
      <CountsSection/>
      <Testimonials/>
      <TreatmentSection/>
      <TeamSection/>
      <AboutUs/>
      <MapSection/>
    </>
    
  );
}
