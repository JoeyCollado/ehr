import React from "react";


interface DoctorProps {
  photo: string;
  firstName: string;
  lastName: string;
  role: string;
  roomNo: string;
  time: string;
  day: string;
  officeNumber: string;
  phoneNumber: string;
}

const Doctors = ({
  photo,
  firstName,
  lastName,
  role,
  roomNo,
  time,
  day,
  officeNumber,
  phoneNumber,
}: DoctorProps) => {
  return (
    <>
     
    <div className="relative p-4 font-sans">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8 pb-10">
        {/* Left Section - Photo with name and specialty below it */}
        <div className="flex flex-col">
          <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 mb-4">
            <img src={photo} alt={`${firstName} ${lastName}`} className="w-full h-full object-cover rounded-lg" />
          </div>
          <div className="mb-4">
            <h1 className="text-3xl font-bold">{firstName}</h1>
            <h1 className="text-3xl font-bold text-[#00695C]">{lastName}</h1>
            <h2 className="text-xl font-semibold mt-10">{role}</h2>
          </div>
        </div>

        {/* Right Section - Contact Info pushed to far right */}
        <div className="md:ml-auto flex flex-col justify-end">
          <div className="text-right">
            <p className="font-bold mb-4">{roomNo}</p>
            <div className="mb-4">
              <p className="font-bold">{time}</p>
              <p>{day}</p>
            </div>
            <div>
              <p className="font-bold">{officeNumber}</p>
              <p>{phoneNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Green Divider at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#00695C] rounded-md"></div>
    </div>
 
    </>
  );
};

export default Doctors;