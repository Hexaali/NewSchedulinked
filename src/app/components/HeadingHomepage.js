"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HeadingHomepage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="text-center">
      {/* Schedulinked */}
      <div
        className="uppercase text-3xl xl:text-7xl md:text-8xl font-bold 
        bg-gradient-to-br from-yellow-600 to-green-500 bg-clip-text text-transparent"
      >
        {"Schedulinked".split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: index * 0.05,
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

      {/* Simplifying Connections */}
      <div className="text-xl md:text-2xl xl:text-3xl font-medium text-white my-2">
        {"Simplifying\u00A0Connections".split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: index * 0.03 + 0.5, // slight delay after first line
              duration: 0.5,
              type: "spring",
              stiffness: 250,
            }}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
