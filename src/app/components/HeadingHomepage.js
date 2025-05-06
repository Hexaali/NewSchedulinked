"use client";
import { motion } from "framer-motion";

const lines = ["Simplifying", "Connections"];

export default function HeadingHomepage() {
  return (
    <>
      {lines.map((word, lineIndex) => (
        <div key={lineIndex}  className="uppercase text-4xl md:text-8xl font-bold mb-6 
        bg-gradient-to-br from-yellow-600 to-green-500 bg-clip-text text-transparent">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.9,
                type: "spring",
                stiffness: 400,
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
