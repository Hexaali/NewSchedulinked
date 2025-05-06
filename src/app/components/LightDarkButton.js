// components/LightDarkButton.js
'use client';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function LightDarkButton() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        p-3 rounded-full 
        bg-gradient-to-br 
        ${darkMode ? 'from-gray-800 to-gray-700' : 'from-yellow-300 to-yellow-500'} 
        shadow-md hover:scale-110 
        transition-all duration-300 ease-in-out
        relative w-12 h-12
      `}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={darkMode ? 'moon' : 'sun'}
          initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {darkMode ? (
            <Moon className="w-6 h-6 text-yellow-300" />
          ) : (
            <Sun className="w-6 h-6 text-green-700" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}