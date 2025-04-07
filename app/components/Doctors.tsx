import React from "react";

const Doctors = () => {
  return (
    <div className="relative p-4 font-sans">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8 pb-10">
        {/* Left Section - Photo with name and specialty below it */}
        <div className="flex flex-col">
          <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 mb-4">
            [Doctor Photo]
          </div>
          <div className="mb-4">
            <h1 className="text-3xl font-bold">LEI Xamantha</h1>
            <h1 className="text-3xl font-bold text-[#00695C]">ALFELOR</h1>
            <h2 className="text-xl font-semibold mt-10">PEDIATRICS</h2>
          </div>
        </div>

        {/* Right Section - Contact Info pushed to far right */}
        <div className="md:ml-auto flex flex-col justify-end">
          <div className="text-right">
            <p className="font-bold mb-4">Bldg/Room no. 9652</p>
            <div className="mb-4">
              <p className="font-bold">Time Day:</p>
              <p>Mon Tue 7: 30 AM - 4: 00 PM</p>
            </div>
            <div>
              <p className="font-bold">Office number:</p>
              <p>099874591288</p>
            </div>
          </div>
        </div>
      </div>

      {/* Green Divider at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#00695C] rounded-md"></div>
    </div>
  );
};

export default Doctors;