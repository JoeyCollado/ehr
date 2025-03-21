import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignedIn,
  UserButton,
  SignOutButton,
} from "@clerk/nextjs";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tamaraw Services",
  description: "LearnTo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* ✅ Moved authentication UI to header only */}
          <header className="fixed top-0 left-0 w-full h-12 flex justify-end items-center px-4 z-50">
            <SignedIn>
              <div className="flex items-center gap-4">
                <UserButton />
                <SignOutButton>
                  <div className="cursor-pointer bg-[#2C3E50] px-6 mx-2 py-1 rounded-md hover:bg-[#C76A5A] hover:scale-105 duration-300 ease-in-out text-white">
                    Sign Out
                  </div>
                </SignOutButton>
              </div>
            </SignedIn>
          </header>

          {/* ✅ Only renders children, so page.tsx decides what to show */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
