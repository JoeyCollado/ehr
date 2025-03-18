import Link from 'next/link';
import { FaHome, FaHeartbeat, FaFileMedical, FaVials, FaCapsules, FaNotesMedical } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="bg-gray-800 text-white w-60 h-screen fixed p-4">
      <ul className="space-y-10 mt-[10%]">
        <li className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded-md">
          <FaHome />
          <Link href="/">Home</Link>
        </li>
        <li className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded-md">
          <FaFileMedical />
          <Link href="/">Medical History</Link>
        </li>
        <li className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded-md">
          <FaHeartbeat />
          <Link href="/">Health Assessment</Link>
        </li>
        <li className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded-md">
          <FaVials />
          <Link href="/">Vital Sheet</Link>
        </li>
        <li className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded-md">
          <FaCapsules />
          <Link href="/">Laboratory Results</Link>
        </li>
        <li className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded-md">
          <FaNotesMedical />
          <Link href="/">Medical Administration Record</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
