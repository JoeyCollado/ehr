import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
      <div className="h-screen flex flex-col min-w-full">
        <div className="h-screen font-sans bg-white  text-[#3A2B22] flex flex-col items-center text-center ">
      <h1 className="text-6xl md:text-7xl font-bold mt-[5%]">Administration Information</h1>

      <div className="bottom-0 h-[10vh] bg-slate-500 w-full">
        <ul className="flex gap-10 text-center ml-[25%]">
            <li><Link href="/pages/registration/administrationInformation/vitalSigns">Vital Signs Sheet</Link></li>
            <li><Link href="/pages/registration/administrationInformation/chiefComplaint">Vital Signs Sheet</Link></li>
            <li><Link href="/pages/registration/administrationInformation/medicalHistory">Vital Signs Sheet</Link></li>
            <li><Link href="/pages/registration/administrationInformation/immunization">Vital Signs Sheet</Link></li>
            <li><Link href="/pages/registration/administrationInformation/healthAssessment">Vital Signs Sheet</Link></li>
        </ul>
      </div>  
    </div>
        <main className="flex-grow">{children}</main>
      </div>
      </>
    );
  }
  
