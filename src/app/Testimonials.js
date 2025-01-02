"use client"
import { Typography } from '@material-tailwind/react';
import Carousel from './components/Carousel';

const reviews = [
  {
    id: 1,
    name: 'Arham Shaikh',
    image: '/ahmarRev.png',
    rating: 5,
    text: "Had my procedure done by Dr. Omer. He was professional, to the point, and very accomodating. Will recommend if you're nervous with visiting dentists. Good experience.",
    platformLogo: '/Google.png',
    link: 'https://g.co/kgs/u5Uv2SK',
  },
  {
    id: 2,
    name: 'Taha imran',
    image: '/tahaRev.png',
    rating: 5,
    text: "Excellent customer service and very professional. Just saw a post that they're helping deserving people for free as well, so keep up the good work and a great initiative. May Allah Bless you guys ♥️. Will visit InshaAllah when I'm in phase 6",
    platformLogo: '/Google.png',
    link: 'https://g.co/kgs/9LacNZn',
  },
  {
    id: 3,
    name: 'Sanpal sahab',
    image: '/sanpalRev.png',
    rating: 4,
    text: 'Got a scaling treatment from Dr Umar and it went without pain. He was very professional and friendly throughout the treatment. I definitely recommend this absolutely professional and friendly Dental clinic.',
    platformLogo: '/Google.png',
    link: 'https://g.co/kgs/hH2ktSK',
  },
  {
    id: 4,
    name: 'Fatima Haniya',
    image: '/fatimaRev.png',
    rating: 5,
    text: 'Cooperative staff, clean environment and very skilled doctor',
    platformLogo: '/Google.png',
    link: 'https://g.co/kgs/V5WELcZ',
  },
  {
    id: 5,
    name: 'sufiankamran21',
    image: '/imranRev.png',
    rating: 5,
    text: 'Had a great experience, highly recommended',
    platformLogo: '/Google.png',
    link: 'https://g.co/kgs/9CRxyUC',
  },
];

const Testimonials = () => {
  return (
    <>
      <section id="testimonials" className="relative h-screen w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
        <div className="absolute inset-0 flex flex-col justify-center items-center p-4">
          <Typography variant='h5' className="font-poppins text-3xl xs:text-3xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-2xl text-center text-brown-200" data-aos="zoom-in" data-aos-duration="3000">
            Testimonials
          </Typography>
          <Typography variant='h1' className="font-poppins text-2xl xs:text-3xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-4xl text-center text-brown-300 mb-8" data-aos="zoom-in" data-aos-duration="3000">
            What our patients says
          </Typography>
          <Carousel reviews={reviews} className="my-4" />
        </div>
      </section>
    </>
  )
}

export default Testimonials;
