"use client"

import React, {useState, useEffect} from 'react'

const Page = () => {

  //
  const [isEditing, setIsEditing] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  //
  const defaultDetails = {
    name: "",
    birthDate: "",
    startDate: "",
    endDate: "",
    doctor: "",
    knownAllergies: "",
    Address: "",
  }

  //
  const [details, setDetails] = useState(defaultDetails);


  //hydration
  useEffect(() => {
    setHasMounted(true);
    const savedDetails = localStorage.getItem("details");

    if(savedDetails) setDetails(JSON.parse(savedDetails));
  }, []);


  //toggle edit
  const handleEdit = () => {
    if(isEditing){
      localStorage.setItem('details', JSON.stringify(details))
    }
    setIsEditing(!isEditing);
  };

  //handle table changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setDetails({...details, [key]: e.target.value});
  };

  //
  if(!hasMounted) return null;

  
  return (
    <>
     <button
        onClick={handleEdit}
        className="text-center text-1xl cursor-pointer rounded-md px-3 text-white bg-blue-500 justify-center ml-[50%] mt-[5%]"
      >
        {isEditing ? "Save" : "Edit"}
      </button>
      <div className="max-w-6xl mx-auto p-4 text-black">
      <h2 className="text-2xl font-bold text-center bg-[#f8e6db] p-2 border border-black">
        Medication Administration Record (MAR)
      </h2>

      {/* first part of table */}
      <table className="w-full border-collapse border border-black mt-2">
  <tbody>
    <tr>
      <td className="border border-black p-2 font-bold">Name: A.J.S</td>
      <td className="border border-black p-2 font-bold">Start Date:</td>
      <td className="border border-black p-2 font-bold">End Date:</td>
    </tr>
    <tr>
      <td className="border border-black p-2 font-bold">Date of Birth</td>
      <td className="border border-black p-2 font-bold" colSpan={2}>Doctor:</td>
    </tr>
    <tr>
      <td className="border border-black p-2 font-bold" colSpan={3}>Known allergies:</td>
    </tr>
    <tr>
      <td className="border border-black p-2 font-bold" colSpan={3}>Address: Manila</td>
    </tr>
  </tbody>
</table>


    </div>
   
    </>
  )
}

export default Page;
