import React from 'react';
import Link from 'next/link';

const Subnav = () => {
  return (
    <div className="absolute top-15 w-full h-[10vh]   text-white flex justify-center items-center">
      <ul className="flex gap-6 text-1xl ">
        {[
          { href: "/pages/registration/administrationInformation/vitalSigns", label: "Vital Signs "},
          { href: "/pages/registration/administrationInformation/chiefComplaint", label: "Chief Complaint" },
          { href: "/pages/registration/administrationInformation/healthAssessment", label: "Health Assessment" },
          { href: "/pages/registration/administrationInformation/immunization", label: "Immunization" },
          { href: "/pages/registration/administrationInformation/medicalHistory", label: "Medical History" }
        ].map((item, index) => (
          <li key={index} className='hover:scale-105 ease-in-out duration-300'>
            <Link href={item.href}>
              <button className="px-4 py-3 cursor-pointer  bg-[#ffffff]  text-black hover:bg-[#eeeded] hover:scale-105 duration-300 ease-in-out font-semibold rounded-lg shadow-lg  transition">
                {item.label}
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Subnav;
