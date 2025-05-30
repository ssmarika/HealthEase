import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryClientProvider from "@/provider/ReactQueryClientProvider";
import ReduxProvider from "@/provider/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "HealthEase",
  description: "HealthEase, an online platform for medical services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ReactQueryClientProvider>
        <ReduxProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {children}
          </body>
        </ReduxProvider>
      </ReactQueryClientProvider>
    </html>
  );
}
