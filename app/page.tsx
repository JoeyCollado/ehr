"use client";
import { useUser, SignInButton, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HomePage() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [backgroundImage, setBackgroundImage] = useState("/photo1.png");

  useEffect(() => {
    if (isSignedIn) {
      router.push("/pages/home"); // Redirect to your custom folder
    }
  }, [isSignedIn, router]);

  // Image slideshow effect with smooth transitions
  useEffect(() => {
    const images = ["/photo1.png", "/photo2.png", "/photo3.png"];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % images.length;
      setBackgroundImage(images[index]);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <div className="h-screen flex flex-col md:flex-row items-center justify-center bg-gray-50">
      {/* Left Side - Image Section */}
      <div className="hidden md:flex md:w-1/2 h-full relative overflow-hidden">
        <motion.div
          key={backgroundImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center transition-all"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20"></div>
      </div>

      {/* Right Side - Content Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center text-center p-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900"
        >
          Tamaraw Services
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl font-semibold text-gray-700 mt-2"
        >
          Electronic Health Records
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-md mt-4 text-gray-600 max-w-md"
        >
          Securely manage and access health records with ease. <br></br>Sign in to get started.
        </motion.p>

        <SignedOut>
          <SignInButton>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className=" cursor-pointer bg-[#00695C] hover:bg-[#43A047] duration-300 ease-in-out hover:scale-105 px-6 py-3 rounded-lg mt-6 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all"
            >
              Sign In
            </motion.div>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
   
     </>
  );
}