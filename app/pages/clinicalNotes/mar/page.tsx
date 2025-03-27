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
  //if(hasMounted) return null;

  
  return (
    <>
    <button onClick={handleEdit} className='text-center text-1xl cursor-pointer rounded-md px-3 text-white bg-blue-500 justify-center '></button>
    <div className='h-screen flex items-center justify-center bg-[#ffffff] text-[#3A2B22] mb-[20%] '>
      <div className='bg-red-400 h-[100vh] w-[80%] mt-[20%]'></div>
      
    </div>
    </>
  )
}

export default Page;
