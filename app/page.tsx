"use client";
import { useUser, SignInButton, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/pages/home"); // Redirect to your custom folder
    }
  }, [isSignedIn, router]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#ffe4c4] to-[#ffd8b1] text-gray-800">
      <h1 className="text-5xl md:text-6xl font-bold">Tamaraw Services</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mt-2">
        Electronic Health Records
      </h2>
      <p className="text-lg mt-4">Sign in to get started</p>

      <SignedOut>
        <SignInButton>
          <div className="cursor-pointer bg-[#685442] px-4 py-2 rounded-md hover:bg-[#ab886a] text-[#EAE0D5] mt-4">
            Sign In
          </div>
        </SignInButton>
      </SignedOut>
    </div>
  );
}
