// 404Page.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-green-100 dark:from-gray-900 dark:to-gray-800 text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Typography variant="h1" className="text-6xl font-bold text-green-700 dark:text-yellow-400">
          404
        </Typography>
        <Typography variant="h4" className="mt-4 text-gray-700 dark:text-gray-200">
          Oops! Page not found.
        </Typography>
        <Typography className="mt-2 text-gray-600 dark:text-gray-400">
          The page you are looking for doesn’t exist or has been moved.
        </Typography>

        <Link to="/">
          <Button className="mt-6 bg-green-600 dark:bg-yellow-500 hover:scale-105 transition-transform">
            Go Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
