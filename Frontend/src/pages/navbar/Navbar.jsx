import React from 'react'
import { useAuthContext } from '../../context/Authcontext';
import { IoMdNotifications } from "react-icons/io";

function Navbar() {
  const {authUser}=useAuthContext();
  return (
    <div className='flex items-center justify-between bg-green-400 w-full h-20 mb-2 p-4'>
    <div className='flex items-center'>
      <span className='text-white text-lg'>{authUser.name}</span>
    </div>
    <div className='flex items-center'>
    <button className='text-white'><IoMdNotifications /></button>
    </div>
    <div className='flex items-center'>
      <img src='src/assets/logo/navbarlogo.png' alt='the-logo' className='w-16 h-12' />
    </div>
  </div>
  )
}

export default Navbar;