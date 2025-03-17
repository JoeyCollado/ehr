"use client";
import { useUser } from "@clerk/nextjs";
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
    <>
      <div className="mt-20 h-screen bg-white text-gray-500">
        <h1 className="text-7xl text-center font-bold">Electronic Health Records</h1>
        <p className="text-center">Sign in to get started</p>
      </div>
 
    </>
  );
}
