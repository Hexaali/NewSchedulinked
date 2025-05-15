import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Schedulinked",
  description: "Simplifying Connections",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // fixes iOS address bar overlap
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <ThemeProvider>
            <Navbar />
            {children}
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
