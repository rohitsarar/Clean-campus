import React from 'react';
import { IoHome } from "react-icons/io5";
import { FaMessage } from "react-icons/fa6";
import { BiSolidUserAccount } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

function Button() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/tasklist');
  };

  const  handleUserData=()=>{
    navigate('/userdata')
  }

  const handleHome=()=>{
    navigate('/home');
  };
  return (
<div className='flex justify-around bg-white text-black rounded-xl m-6 p-4 shadow-md'>
      <button onClick={() => handleHome('/home')} className="flex flex-col items-center cursor-pointer">
        <IoHome className="text-2xl" />
        <span>Home</span>
      </button>
      <button onClick={() => handleNavigate('/tasklist')} className="flex flex-col items-center cursor-pointer">
        <FaMessage className="text-2xl" />
        <span>Messages</span>
      </button>
      <button onClick={() => handleUserData('/userdata')} className="flex flex-col items-center cursor-pointer ">
        <BiSolidUserAccount className="text-2xl" />
        <span>User</span>
      </button>
    </div>
  );
}

export default Button;
    