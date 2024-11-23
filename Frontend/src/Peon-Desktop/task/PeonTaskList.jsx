import React from 'react'
import PeonTaskPost from './PeonTaskPost';
import PeonButton from '../peon-navbar/PeonButton';

function PeonTaskList() {
  
 
        return (
          <section className="flex flex-col gap-2 p-4 pb-20 text-black">
            <header className="m-2 p-2">
              <span>Clean-Campus</span>
            </header>
      
            {/* Task Posts */}
          <PeonTaskPost/>
          <PeonTaskPost/>
          <PeonTaskPost/>
          <PeonTaskPost/>
          <PeonTaskPost/>
          <PeonTaskPost/>
            {/* Fixed Button at the Bottom */}
            <div className="fixed bottom-0 left-0 w-full">
            <PeonButton/>
            </div>
          </section>
        );
      }

export default PeonTaskList