import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
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
        <header className="fixed top-0 left-0 w-full h-12 flex justify-end items-center px-4 z-50">
  <SignedOut>
    <SignInButton>
      <div className="cursor-pointer bg-[#685442] px-2 py-1 rounded-md hover:bg-[#ab886a] text-[#EAE0D5]">Sign In</div>
    </SignInButton>
  </SignedOut>
  <SignedIn>
    <div className="flex items-center gap-4">
      <UserButton />
      <SignOutButton>
        <div className="cursor-pointer bg-[#685442] px-2 py-1 rounded-md hover:bg-[#ab886a] text-[#EAE0D5]">Sign Out</div>
      </SignOutButton>
    </div>
  </SignedIn>
</header>

          
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
