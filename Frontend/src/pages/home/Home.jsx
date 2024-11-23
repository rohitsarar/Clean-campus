import React from 'react';
import Navbar from '../navbar/Navbar';
import CameraLogo from '../../components/cameralogo/CameraLogo';
import Button from '../navbar/buttonnavbar/Button';

function Home() {
  return (
    <div className="bg-yellow-100 min-h-screen">
  <Navbar />

  <div className="text-black bg-white rounded-lg m-8 p-4 flex flex-col items-center justify-center text-center">
  <b className=" text-lg">L.S. RAHEJA COLLEGE OF ARTS & COMMERCE (AUTONOMOUS)</b>
  <h3 className="text-base">2024-2025</h3>

</div>
<div className="flex justify-center items-center border m-2 p-2">
  <CameraLogo />
</div>
<div className='h-64'>

</div>
<Button/>

</div>
  );
}


export default Home;
