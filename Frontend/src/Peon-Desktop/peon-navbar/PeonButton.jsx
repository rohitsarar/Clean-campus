import React from 'react';
import { IoHome } from "react-icons/io5";
import { BiSolidUserAccount } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

function PeonButton() {
  const navigate = useNavigate();

  const handlePeonHome = () => {
    navigate('/peonhome'); // Navigates to PeonHome
  };

  const handlePeonData = () => {
    navigate('/peondata'); // Navigates to PeonData within PeonHome
  };

  return (
    <div className="flex justify-around bg-white text-black rounded-xl m-6 p-4 shadow-md">
      <button onClick={handlePeonHome} className="flex flex-col items-center cursor-pointer">
        <IoHome className="text-2xl"  />
        <span>Home</span>
      </button>

      <button onClick={handlePeonData} className="flex flex-col items-center cursor-pointer">
        <BiSolidUserAccount className="text-2xl" />
        <span>User</span>
      </button>
    </div>
  );
}

export default PeonButton;
