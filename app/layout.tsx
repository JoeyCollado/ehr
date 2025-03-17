import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-500`}
        >
          <header className="mb-5 z-20 transition-all duration-300 ease-in-out">
            <SignedOut>
              <div className="flex flex-row-reverse m-2 z-20 transition-all duration-300 ease-in-out">
                <div className="rounded-md px-2 z-20 hover:text-blue-700 transition-all duration-300 ease-in-out">
                  <div className="text-2xl text-center font-bold flex transition-all duration-300 ease-in-out rounded-md px-2 mt-2 text-[14px]">
                    <SignInButton>
                      <div className="cursor-pointer text-gray-500">Sign In</div>
                    </SignInButton>
                  </div>
                </div>
              </div>
            </SignedOut>
            <SignedIn>
              <div className="flex justify-end gap-5 m-2 z-20">
                <div className="z-20 mt-[2px]">
                  <UserButton />
                </div>
                <div className="rounded-md px-1 h-[22px] z-20 mr-4 mt-[5px] hover:text-blue-700 transition-all duration-300 ease-in-out text-[14px]">
                  <SignOutButton>
                    <div className="cursor-pointer text-gray-500">Sign Out</div>
                  </SignOutButton>
                </div>
              </div>
            </SignedIn>
          </header>

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
