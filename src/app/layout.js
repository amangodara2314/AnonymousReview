import localFont from "next/font/local";
import "./globals.css";
import GlobalContext from "@/context/GlobalContext";
import "tailwindcss/tailwind.css";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "AnonymousInsight",
  description: "Take or give anonymous review",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GlobalContext> {children}</GlobalContext>
      </body>
    </html>
  );
}
