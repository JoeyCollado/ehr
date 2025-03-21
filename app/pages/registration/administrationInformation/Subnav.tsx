import React from 'react';
import Link from 'next/link';

const Subnav = () => {
  return (
    <div className="absolute top-5 w-full h-[10vh]  text-white flex justify-center items-center">
      <ul className="flex gap-6">
        {[
          { href: "/pages/registration/administrationInformation/vitalSigns", label: "Vital Signs Sheet"},
          { href: "/pages/registration/administrationInformation/chiefComplaint", label: "Chief Complaint" },
          { href: "/pages/registration/administrationInformation/healthAssessment", label: "Health Assessment" },
          { href: "/pages/registration/administrationInformation/immunization", label: "Immunization" },
          { href: "/pages/registration/administrationInformation/medicalHistory", label: "Medical History" }
        ].map((item, index) => (
          <li key={index}>
            <Link href={item.href}>
              <button className="px-4 py-2 cursor-pointer bg-white text-[#A8443B] font-semibold rounded-lg shadow-md hover:bg-[#FEECE2] transition">
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
