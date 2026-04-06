import React, { use } from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';
const AddEditNotes = ({noteData,type,getAllNotes,onClose,showToastMessage}) => {

  const [title,setTitle] = React.useState(noteData?.title || "");
  const[tags,setTags] = React.useState(noteData?.tags || []);
  const [content,setContent] = React.useState(noteData?.content || "");
  const [error,setError]= React.useState(null);

  //AddNote
  const addNewNote = async() =>{
    try{
      const response=await axiosInstance.post("/add-note",{
        title,
        content,
        tags, 
    });
    if(response.data && response.data.note)    {
      showToastMessage("Note added successfully", "success");
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


  //EditNote
  const editNote = async() =>{
    const noteId=noteData._id;
    try{
      const response=await axiosInstance.put(`/edit-note/${noteId}`, {
        title,
        content,
        tags, 
    });
    if(response.data && response.data.note)    {
      showToastMessage("Note updated successfully", "success");
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

   const handleAddNote = () => {
    if (!title) {
      setError("Title is required");
      return;
    }
   
    if(!content)
    {
      setError("Content is required");
    return;
    }
    setError("");
    if(type=='edit')
    {editNote()

    }
    else{
      addNewNote();
    }
  };
    return (
    <div className='relative'>  

      <button className="w-10 h-10 rounded-full flex items-center justify-center absolute -right-3 hover:bg-slate-200" onClick={onClose}>
        <MdClose className='text-xl text-slate-400 '/>
      </button>
      <div className='flex flex-col gap-2'>
        <label className='input-label'>Title</label>
        <input type="text" className='text-2xl text-slate-950 outline-none' placeholder='2 Sum'
        value={title}
        onChange={({target})=>setTitle(target.value)}/>
      </div>
   
     

     <div className='flex flex-col gap-2 mt-4'>
      <label className='input-label'>Content</label>
      <textarea type="text"
       className='text-slate-950 outline-none bg-slate-50 p-2 rounded'
        placeholder='Can use hash map'
        rows={10}
        value={content}
        onChange={({target})=>setContent(target.value)}
        />
        </div>

        <div className='mt-3'>
          <label className='input-label'>Tags</label>
          <TagInput tags={tags} setTags={setTags}/>
          </div>

          {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
<button
  className='px-4 py-2 rounded bg-primary text-white hover:bg-blue-600 mt-4'
  onClick={handleAddNote}
>
  {type === "edit" ? "Update" : "Add"}
</button>
         </div>
       
  );
} ;


export default AddEditNotes
