"use client"

import React, {useState, useEffect} from 'react'

const page = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const defaultDetails = {
    name: "",
    birthDate: "",
    startDate: "",
    endDate: "",
    doctor: "",
    knownAllergies: "",
    Address: "",
  }

  
  return (
    <div className='h-screen flex items-center justify-center bg-[#ffffff] text-[#3A2B22] mb-[20%] '>
      <div className='bg-red-300 h-[100vh] w-[80%] mt-[20%]'></div>
      
    </div>
  )
}

export default page
