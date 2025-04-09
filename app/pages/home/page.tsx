"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Footer from "@/app/components/Footer";

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
      <div className="min-h-screen font-sans bg-[#faf6f6] text-[#3A2B22] flex flex-col items-center text-center p-6">
        {/* Welcome Message */}
        <div ref={welcomeRef} className="mt-25 px-[12%] py-5 pb-15 rounded-lg">
          <h1 className="text-6xl md:text-7xl font-bold mt-[5%]">Welcome Back!</h1>
          <p className="text-xl mt-4">Manage your health records with ease</p>
        </div>

        {/* Quick Access Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-20">
          {[
            { label: "Our Doctors", icon: "👨‍⚕️", href: "/pages/cdss/ourDoctors" },
            { label: "Treatment", icon: "💊", href: "/pages/cdss/treatment" },
            { label: "Diagnosis", icon: "🩺", href: "/pages/cdss/diagnosis" },
            { label: "Monitoring", icon: "📈", href: "/pages/cdss/monitoring" },
            { label: "Diagnostic", icon: "🧪", href: "/pages/cdss/recod" },
            { label: "Supportive Care", icon: "🤝", href: "/pages/cdss/recos" },
          ].map((item, index) => (
            <Link key={index} href={item.href}>
              <div
                ref={(el) => {
                  if (el) tilesRef.current[index] = el;
                }}
                className="flex flex-col items-center justify-center p-6 bg-[#ffffff] rounded-lg shadow-md w-52 
                  transition transform hover:scale-105 hover:shadow-lg hover:bg-[#f1f1f1] cursor-pointer"
              >
                <span className="text-3xl">{item.icon}</span>
                <p className="mt-2 font-medium">{item.label}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-32 w-full max-w-3xl">
  <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
  <div
    ref={activityRef}
    className="bg-gray-100 p-6 rounded-lg shadow-md space-y-5 text-start"
  >
    {[
      {
        icon: "✅",
        text: "New Lab result uploaded",
        time: "2 hours ago",
        href: "/pages/results/labValues",
      },
      {
        icon: "📄",
        text: "Radiology Updated",
        time: "Yesterday",
        href: "/pages/results/radiology",
      },
      {
        icon: "🔔",
        text: "New Clinical Notes",
        time: "Thursday",
        href: "/pages/clinicalNotes/progressNotes",
      },
    ].map((activity, index) => {
      const card = (
        <div
          key={index}
          className="flex items-center bg-white p-4 rounded-md shadow-sm transition transform 
            hover:scale-105 hover:shadow-md cursor-pointer"
        >
          <span className="text-2xl">{activity.icon}</span>
          <div className="ml-4">
            <p className="text-lg">{activity.text}</p>
            <span className="text-sm text-gray-500">{activity.time}</span>
          </div>
        </div>
      );

      return activity.href ? (
        <Link key={index} href={activity.href}>{card}</Link>
      ) : (
        <div key={index}>{card}</div>
      );
    })}
  </div>
</div>
      </div>

      <div className="mt-[5%]">
        <div className="text-black"></div>
        <Footer />
      </div>
    </>
  );
};

export default Page;
