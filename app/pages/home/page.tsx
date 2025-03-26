"use client";
import Footer from "@/app/components/Footer";
import React from "react";

const Page = () => {
  return (
    <>
      <div className="min-h-screen font-sans bg-white text-[#3A2B22] flex flex-col items-center text-center p-6">
        {/* Welcome Message */}
        <h1 className="text-6xl md:text-7xl font-bold mt-[10%]">Welcome Back!</h1>
        <p className="text-xl mt-4">Manage your health records with ease</p>

        {/* Quick Access Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12">
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
              className="flex flex-col items-center justify-center p-6 bg-[#E0F2F1] rounded-lg shadow-md hover:bg-[#43A047] hover:text-white transition cursor-pointer w-40"
            >
              <span className="text-3xl">{item.icon}</span>
              <p className="mt-2 font-medium">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-12 w-full max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md space-y-5 text-start">
            {[
              { icon: "✅", text: "Lab result uploaded for John Doe", time: "2 hours ago" },
              { icon: "📄", text: "New clinical note added", time: "Yesterday" },
              { icon: "🔔", text: "Upcoming appointment: Jane Smith (Tomorrow)", time: "Scheduled" },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center bg-white p-4 rounded-md shadow-sm hover:shadow-md transition"
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

      <Footer />
    </>
  );
};

export default Page;
