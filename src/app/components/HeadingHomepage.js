"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const lines = ["Simplifying", "Connections"];

export default function HeadingHomepage() {
  const [isClient, setIsClient] = useState(false);

  // Ensures animation only runs after client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
      {lines.map((word, lineIndex) => (
        <div
          key={lineIndex}
          className="uppercase text-4xl xl:text-7xl md:text-8xl font-bold mb-6
          bg-gradient-to-br from-yellow-600 to-green-500 bg-clip-text text-transparent"
        >
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: charIndex * 0.05, // add delay for nicer staggered animation
                duration: 0.6,
                type: "spring",
                stiffness: 300,
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </div>
      ))}
    </>
  );
}
