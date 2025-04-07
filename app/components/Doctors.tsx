import React from 'react'

const Doctors = () => {
  return (
    <div className="p-4 font-sans flex flex-col md:flex-row gap-8">
    {/* Photo Section */}
    <div className="w-full flex flex-col items-left">
      <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 mb-4">
        [Doctor Photo]
      </div>
      <div className="text-left w-full ">
        <h1 className="text-3xl font-bold">LEI Xamantha</h1>
        <h1 className="text-3xl font-bold">ALFELOR</h1>
        <h2 className="text-1xl font-semibold mt-5">PEDIATRICS</h2>
      </div>
    </div>

    {/* Information Section - Right Side */}
    <div className="w-full md:w-2/3 flex flex-col items-end text-left">
      <div>
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
  )
}

export default Doctors
