import React from 'react'
import { useState } from 'react';
import { FaRegThumbsUp } from "react-icons/fa";
import imgUser from '../../assets/logo/vector-users-icon.jpg';
import imgPost from '../../assets/logo/post.jpg';



function PeonTaskPost() {


  const [isLiked, setIsLiked] = useState(false);

  const handleThumbClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="flex flex-col gap-2 border border-black rounded-lg p-4">
      <div className="flex flex-row justify-between items-center p-2 border-b border-black">
        <div className="flex flex-row items-center gap-4">
          <img src={imgUser} alt="User avatar" className="h-10 w-10 rounded-full object-cover" />
          <span>UserName</span>
        </div>
      </div>

      <div className="p-2">
        <img src={imgPost} alt="Post content" className="w-full rounded-md" />
      </div>

      <div className="flex justify-center mt-2">
        <button onClick={handleThumbClick}>
          <FaRegThumbsUp
            className={`text-3xl cursor-pointer ${isLiked ? 'text-green-500' : 'text-black'}`}
          />
        </button>
      </div>
    </div>
  );
}


export default PeonTaskPost