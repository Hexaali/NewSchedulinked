"use client"
import "./globals.css";
import { useEffect } from "react";
import MyNavbar from "./components/MyNavbar";
import { MyFooter } from "./components/MyFooter";
import { ThemeProvider } from "./ThemeContext";
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos';

export default function RootLayout({ children }) {

        useEffect(() => {
          AOS.init({
            duration: 1000, // Optional: Set the default duration for animations
          });
        }, []);

  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <MyNavbar />
          {children}
          <MyFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
