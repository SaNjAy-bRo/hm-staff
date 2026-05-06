import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "HM Tech Staffing | End-to-End Staffing Solutions for Global Corporations",
  description:
    "HM Tech Staffing provides a complete spectrum of end-to-end staffing services for global corporations. From freshers to highly experienced candidates across diverse backgrounds.",
  keywords: "tech staffing, recruitment, IT staffing, workforce solutions, talent acquisition, HM Tech",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className="font-[var(--font-inter)] antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
