import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ChatProvider } from "../context/ChatContext";
import { Saira } from 'next/font/google';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const saira = Saira({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-saira',
});

export const metadata: Metadata = {
  title: "Manipulation Guide - Research Tool",
  description: "A research tool for understanding manipulation techniques",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Manipuruhi</title>
        <meta name="description" content="Manipulation guide powered by Gemini AI" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${saira.className} antialiased`}
      >
        <ChatProvider>
        {children}
        </ChatProvider>
      </body>
    </html>
  );
}
