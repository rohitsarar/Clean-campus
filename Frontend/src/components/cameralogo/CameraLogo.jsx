import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera } from "react-icons/fa";

function CameraLogo() {
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate('/photoclick'); // Navigates to the PhotoClick page
  };

  return (
    <div className='flex flex-col items-center justify-center w-full' style={{ maxWidth: '200px' }}>
      <button className='flex items-center justify-center w-full h-12 text-white rounded mb-2'>
        <FaCamera className='text-black' style={{ width: '50px', height: '50px' }} />
      </button>
      <button onClick={handleOpen} className='w-full h-12 bg-green-500 text-white rounded'>
        Take Report
      </button>
    </div>
  );
}

export default CameraLogo;
