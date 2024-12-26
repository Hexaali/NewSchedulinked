"use client";

import { Typography } from '@material-tailwind/react';
import Image from 'next/image';


const MyCard = ({ imageSrc, altText, title}) => {
    return (
        <div 
         className="w-full max-w-xs mx-auto pt-4 bg-white rounded-lg 
                    shadow-md overflow-hidden transition-colors duration-500 
                    ease-in-out hover:bg-brown-100 dark:bg-gray-700 flex flex-col items-center justify-center 
                    hover:shadow-lg"
                >
            <Image src={imageSrc} alt={altText} width={100} height={20}/>
            <div className="p-6 text-center">
                <Typography variant="small" className='font-semibold text-wrap text-brown-200'>{title}</Typography>
            </div>
        </div>
    );
}

export default MyCard;
