import React from 'react';
import { IoSend } from "react-icons/io5";

function Message() {
  return (
    <div className='flex items-center justify-center w-full mb-2' style={{ maxWidth: '500px' }} >
      <input
        type='text'
        className='flex-grow p-3 rounded-l-lg bg-white text-black placeholder-gray-400 border border-gray-300'
        placeholder='Add caption..'
        style={{ maxWidth: '100%' }}
      />
      <button className='p-2 bg-green-500 text-white rounded-full ml-2 h-12'>
        <IoSend />
      </button>
    </div>
  );
}

export default Message;
