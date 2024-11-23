import React from 'react';
import Button from '../navbar/buttonnavbar/Button';
import useLogout from '../../hooks/uselogout';
import { useAuthContext } from '../../context/Authcontext';

function UserData() {
  const{logout}=useLogout();
  const{authUser}=useAuthContext();
  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto">
      {/* Profile Picture */}
      <img 
        src="https://via.placeholder.com/100" // Replace with actual profile pic URL
        alt="Profile"
        className="w-24 h-24 rounded-full mb-4"
      />

      {/* User Information */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800">Name:{authUser.name}</h2> {/* Username */}
        <p className="text-gray-500 mb-2">Class:{authUser.classname}</p> {/* Class Name */}
        
        {/* Other personal info */}
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-800">Personal Information</h3>
          <p className="text-gray-500">Email:{authUser.email}</p> {/* Email */}
          <p className="text-gray-500">Address: 123 Main St, City</p> {/* Address */}
        </div>
        <button className='text-white bg-green-500 rounded-lg m-2 p-2' onClick={logout}>Logout</button>
      </div>
      <div className="fixed bottom-0 left-0 w-full">
          <Button />
        </div>
    </div>
  );
}

export default UserData;
