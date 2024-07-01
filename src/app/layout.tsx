import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/Navbar/index";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import clsx from "clsx";
import { createClient } from "@/prismicio";
import { ThirdwebProvider } from "thirdweb/react";

import { Providers } from './providers'

const urbanist = Urbanist({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: settings.data.meta_title,
    description: settings.data.meta_description,
    // openGraph: {
    //   images: [settings.data.og_image?.url || ""],
    // },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-slate-900 text-slate-100">
      <body className={clsx(urbanist.className, "relative min-h-screen")}>
      <Providers>
      <ThirdwebProvider>
      <Navbar />
         {/* <Header />  */}
        {children}
        {/* <Footer /> */}
        <div className="absolute inset-0 -z-50 max-h-screen background-gradient"></div>
        <div className="absolute pointer-events-none inset-0 -z-40 h-full bg-[url('/noisetexture.jpg')] opacity-20 mix-blend-soft-light"></div>
        </ThirdwebProvider>
        </Providers>
      </body>
    </html>
  );
}