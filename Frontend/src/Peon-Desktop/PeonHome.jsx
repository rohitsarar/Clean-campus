import React from 'react';



import PeonNavbar from './peon-navbar/PeonNavbar';
import PeonButton from './peon-navbar/PeonButton';
import TaskList from '../components/tasklist/TaskList';


function PeonHome() {
  return (
    <div className="bg-yellow-100 min-h-screen">
      <PeonNavbar />
     
<TaskList/>
      <div className="fixed bottom-0 left-0 w-full">
        <PeonButton />
      </div>

     
    </div>
  );
}

export default PeonHome;
