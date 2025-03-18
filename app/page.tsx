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
      <div className="h-screen  text-gray-500">
        <h1 className="text-[4rem] text-center font-bold mt-[10%]">Tamaraw Services</h1>
        <p className="text-center">Sign in to get started</p>
      </div>
 
    </>
  );
}
