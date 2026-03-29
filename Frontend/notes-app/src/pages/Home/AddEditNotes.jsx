import React, { use } from 'react'
import TagInput from '../../components/Input/Taginput'
import { MdClose } from 'react-icons/md';

const AddEditNotes = ({noteData,type,onClose}) => {

  const [title,setTitle] = React.useState("");
  const[tags,setTags] = React.useState([]);
  const [content,setContent] = React.useState("");
  const [error,setError]= React.useState(null);
  const addNewNote = async() =>{}
  const editNote = async() =>{}
  const handleAddNote =()=>{}
    if(!title)
    {
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
        <input type="text" className='text-2xl text-slate-950 outline-none' placeholder='Goto Gym @ 5'
        value={title}
        onChange={({target})=>setTitle(target.value)}/>
      </div>
   
     

     <div className='flex flex-col gap-2 mt-4'>
      <label className='input-label'>Content</label>
      <textarea type="text"
       className='text-slate-950 outline-none bg-slate-50 p-2 rounded'
        placeholder='Goto Gym @ 5'
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
          <button className='px-4 py-2 rounded bg-primary text-white hover:bg-blue-600 mt-4' onClick={(handleAddNote)}>Add</button>

         </div>
       
  )
} 

export default AddEditNotes
