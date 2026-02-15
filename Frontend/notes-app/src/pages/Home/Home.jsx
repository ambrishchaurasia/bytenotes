import React, { useState } from "react";
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import {MdAdd} from 'react-icons/md'

const Home = () => {
  return (
  <>
  <Navbar />
  <div className='container mx-auto px-4'>
    <div className='grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8'> 
    <NoteCard title="Meeting @ 7pmm" 
    date="18 July 2026"
    tags="#meeting"
    content="Meeting @7pm ,where i want to learn graphs"
    isPinned={true}
    onEdit={()=>{}}
    onDelete={()=>{}}
    onPinNote={()=>{}}
    />
      <NoteCard title="Meeting @ 7pmm" 
    date="18 July 2026"
    tags="#meeting"
    content="Meeting @7pm ,where i want to learn graphs"
    isPinned={true}
    onEdit={()=>{}}
    onDelete={()=>{}}
    onPinNote={()=>{}}
    />
      <NoteCard title="Meeting @ 7pmm" 
    date="18 July 2026"
    tags="#meeting"
    content="Meeting @7pm ,where i want to learn graphs"
    isPinned={true}
    onEdit={()=>{}}
    onDelete={()=>{}}
    onPinNote={()=>{}}
    />
      <NoteCard title="Meeting @ 7pmm" 
    date="18 July 2026"
    tags="#meeting"
    content="Meeting @7pm ,where i want to learn graphs"
    isPinned={true}
    onEdit={()=>{}}
    onDelete={()=>{}}
    onPinNote={()=>{}}
    />
    
    </div>
  </div>
  <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10" onClick={()=>{}}>
    <MdAdd className="text-[32px] text-white"/>
  </button>
  </>
  );
};

export default Home;
