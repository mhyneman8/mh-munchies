import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { RestaurantsProvider } from "@/contexts/RestaurantsContext";

const sfPro = localFont({
  src: '../assets/fonts/SF-Pro.woff2',
  variable: "--font-sf-pro",
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});


export const metadata: Metadata = {
  title: "Munchies",
  description: "Find the best food near you!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={sfPro.variable} lang="en">
      <body
        className={`antialiased`}
      >
        <RestaurantsProvider>
          {children}
        </RestaurantsProvider>
      </body>
    </html>
  );
}
