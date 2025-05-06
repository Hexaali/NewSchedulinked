import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext"; 
import "./globals.css";
import Navbar from "./components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-helvetica">
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