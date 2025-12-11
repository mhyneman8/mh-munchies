import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sfPro = localFont({
  src: './fonts/SF-Pro-Text-Regular.woff2',
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
        {children}
      </body>
    </html>
  );
}
