import React, { useState } from "react";
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import {MdAdd} from 'react-icons/md'
import AddEditNotes from "./AddEditNotes";
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import { all } from "axios";
import moment from "moment";
import Toast from "../../components/ToastMessage/Toast";  
import axiosInstance from "../../utils/axiosInstance";
import AddNotesImg from '../../assets/no-notes.png';
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import NoDataImg from '../../assets/no-data.png';

const Home = () => {
  const [showAddEditNote,setShowAddEditNote] = useState({
    isShown:false,
    type:"add",
    data:null,
  });

const [showToast,setShowToast]=useState({
  isShown:false,
  message:"",
  type:"message", //success,error,warning
});

const [userInfo,setUserInfo]=useState(null);
const navigate=useNavigate();
const [allNotes,setAllNotes]=useState([]);

const [isSearch,setIsSearch]=useState(false);

const handleEdit = (noteDetails)=>{
  setShowAddEditNote({
    isShown:true,
    type:"edit",
    data:noteDetails,
  })
}

const showToastMessage=(message, type="success")=>{
  setShowToast({
    isShown:true, 
    message:message,
    type:type,
  })
}

const handleCloseToast=()=>{
  setShowToast({
    isShown:false, 
    message:"",
    type:"success",
  })
}


//GET USER INFO
const getUserInfo=async ()=>{
  const token=localStorage.getItem("token");
  
    try{
      const response=await axiosInstance.get("/get-user");
      if(response.data && response.data.user)
      {
        setUserInfo(response.data.user);
      }   
    }
    catch(err)
    {
      if(err.respose.status===401)
      {
        localStorage.clear();
        navigate("/login");
      }
     
  }
};

const getAllNotes=async()=>{
  try{
    const response=await axiosInstance.get("/get-all-notes"); 
    if(response.data && response.data.notes)
    {
      setAllNotes(response.data.notes);
    } 
  }
  catch(err)
  {
    if(err.response.status===401)
    {
      console.log("An unexpected error occurred while fetching notes.");
    }
  }
}

const deleteNote=async(data)=>{
  const noteId=data._id;
  try{
      const response=await axiosInstance.delete("/delete-note/"+noteId);
    if(response.data && !response.data.error)    {
      showToastMessage("Note deleted successfully", "delete");
       getAllNotes()
        onClose();
    }
  }
  catch(err)  {
    if(err.response && err.response.data && err.response.data.message)
    {
      setError(err.response.data.message);
    }
    else
    {
      setError("An unexpected error occurred while adding note.");
    }
  }
}

//search notes
const searchNotes=async(searchQuery)=>{
  try{
    const response=await axiosInstance.get("/search-notes", {
      params: {
        query: searchQuery
      }
    });
    if(response.data && response.data.notes)
    {
      setIsSearch(true);
      setAllNotes(response.data.notes);
    }
  }
  catch(err)
  {
    if(err.response && err.response.data && err.response.data.message)
    {
      setError(err.response.data.message);
    }
    else
    {
      setError("An unexpected error occurred while searching notes.");

    }
  }
}

const updatePinStatus=async(noteData)=>{
  const noteId=noteData._id;
    try{
      const response=await axiosInstance.put(`/update-note-pinned/${noteId}`, {
       "isPinned":!noteData.isPinned,
    });
    if(response.data && response.data.note)    {
      showToastMessage("Note updated successfully", "success");
       getAllNotes()
        
    }
  }
  catch(err)  {
   console.error("Error updating note:", err);
  }
}

const handleClearSearch=async()=>{
  setIsSearch(false);
  getAllNotes();
}


React.useEffect(()=>{
  getAllNotes();
  getUserInfo();
  return()=>{
  }
},[])



  return (
  <>
  <Navbar userInfo={userInfo} onSearchNote={searchNotes} onClearSearch={handleClearSearch} />

  <div className='container mx-auto px-4'>
    {allNotes.length>0 ? (<div className='grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8'> 
      {allNotes.map((item,index)=>(
        <NoteCard 
        key={item._id}
        title={item.title}
        date={moment(item.createdOn).format("DD MMM YYYY")}        
        content={item.content}
        tags={item.tags}
        isPinned={item.isPinned}
        onEdit={()=>{handleEdit(item)}}
        onDelete={()=>{deleteNote(item)}}
        onPinNote={()=>{updatePinStatus(item)}}
          
      />
      ))}
    </div>
    ) : (
      <EmptyCard imgSrc={isSearch ? NoDataImg : AddNotesImg}
       message={isSearch? <p>Oops! No data found.</p> : <p>Every problem has a pattern. Write your approach and recognize it faster next time.<br />Let’s get the grind started !</p>} />
    )} 
  </div>
  <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 fixed right-10 bottom-10"
   onClick={()=>{
    setShowAddEditNote({
      isShown:true,
      type:"add",
      data:null,
    })
   }}>
    <MdAdd className="text-[32px] text-white"/>
  </button>

  <Modal  isOpen={showAddEditNote.isShown} onRequestClose={()=>{}}
    style={{
      overlay:{
        backgroundColor:'rgba(0,0,0,0.5)',
        }
    }}
    contentLabel="Add/Edit Note Modal"
    className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll">
      
      <AddEditNotes
      type={showAddEditNote.type}
      noteData={showAddEditNote.data}
      onClose={()=>{
        setShowAddEditNote({
          isShown:false,
          type:"add",
          data:null
        });
      }}
      getAllNotes={getAllNotes}
      showToastMessage={showToastMessage}
      />
      </Modal>
    
  <Toast 
  isShown={showToast.isShown}
  message={showToast.message}
  type={showToast.type}
  onClose={handleCloseToast}
/>

  </>
  );
};

export default Home;
