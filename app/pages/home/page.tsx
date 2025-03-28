"use client";
import Footer from "@/app/components/Footer";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const welcomeRef = useRef(null);
  const tilesRef = useRef<(HTMLDivElement | null)[]>([]);
  const activityRef = useRef(null);

  useEffect(() => {
    // Welcome Text Animation
    gsap.fromTo(
      welcomeRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.3 }
    );

    // Quick Access Tiles Animation
    gsap.fromTo(
      tilesRef.current,
      { opacity: 0, scale: 0.8, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "elastic.out(1, 0.5)",
      }
    );

    // Recent Activity Animation
    gsap.fromTo(
      activityRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: activityRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <>
      <div className="min-h-screen font-sans bg-[#e3e3e3] text-[#3A2B22] flex flex-col items-center text-center p-6">
        {/* Welcome Message */}
        <div ref={welcomeRef} className="mt-25  px-[12%] py-5 pb-15 rounded-lg">
          <h1 className="text-6xl md:text-7xl font-bold mt-[5%] ">Welcome Back!</h1>
          <p className="text-xl mt-4">Manage your health records with ease</p>
        </div>

        {/* Quick Access Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-20 ">
          {[
            { label: "New Patient", icon: "➕" },
            { label: "Lab Results", icon: "🧪" },
            { label: "Pending Docs", icon: "📂" },
            { label: "Clinical Notes", icon: "📝" },
            { label: "Appointments", icon: "📅" },
            { label: "Billing", icon: "💰" },
          ].map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) tilesRef.current[index] = el;
            }}            
              className="flex flex-col items-center justify-center p-6 bg-[#ffffff] rounded-lg shadow-md w-40 
                transition transform hover:scale-105 hover:shadow-lg hover:bg-[#f1f1f1]  cursor-pointer "
            >
              <span className="text-3xl">{item.icon}</span>
              <p className="mt-2 font-medium">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-32 w-full max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
          <div ref={activityRef} className="bg-gray-100 p-6 rounded-lg shadow-md space-y-5 text-start cursor-pointer">
            {[
              { icon: "✅", text: "Lab result uploaded for John Doe", time: "2 hours ago" },
              { icon: "📄", text: "New clinical note added", time: "Yesterday" },
              { icon: "🔔", text: "Upcoming appointment: Jane Smith (Tomorrow)", time: "Scheduled" },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center bg-white p-4 rounded-md shadow-sm transition transform 
                  hover:scale-105 hover:shadow-md"
              >
                <span className="text-2xl">{activity.icon}</span>
                <div className="ml-4">
                  <p className="text-lg">{activity.text}</p>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>

    
    <div className="mt-[5%]">

      <Footer />
      </div>
    </>
  );
};

export default Page;
