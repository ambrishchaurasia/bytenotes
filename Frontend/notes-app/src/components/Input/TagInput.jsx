import React from 'react'
import { MdAdd,MdClose } from 'react-icons/md';
const TagInput = ({tags,setTags}) => {
    const [inputValue,setInputValue] = React.useState("");
    const handleAddTag = (e) =>{
        setInputValue(e.target.value);
    };
    const addNewTag=() =>{
        if(inputValue.trim() !== "" && !tags.includes(inputValue)){
            setTags([...tags,inputValue.trim()]);
            setInputValue("");
        }
    };
    const handleKeyDown = (e) =>{
        if(e.key === "Enter"){
            e.preventDefault();
            addNewTag();
        }
    }; 
  
    const handleRemoveTag = (tagToRemove ) =>{
        setTags(tags.filter((tag)=> tag !== tagToRemove));
    };
  return (
    <div>
        {
        tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
            {
            tags.map((tag,index)=>(
               <span key={index} className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-2 py-1 rounded">
                {tag}
                <button onClick={()=>{handleRemoveTag(`#${tag}`)

                }}>
                    <MdClose />
                    </button>
                    </span>
))}
</div>
)}
      <div className='flex items-center gap-4 mt-3'>
        <input type="text"
         className='text-sm bg-transparent border px-3 py-2 rounded outline-none'
          placeholder='Enter tag eg: #hashmap'
          onChange={handleAddTag}
          onKeyDown={handleKeyDown}
            value={inputValue}
          />
        <button className="w-8 h-8 flex items-center justify-center rounded border border-yellow-500 hover:bg-yellow-500"
         onClick={()=>{
            addNewTag();
         }}>
            <MdAdd className='text-2xl text-yellow-500 hover:text-white'/>
        </button>
    </div>
    </div>
  )
}

export default TagInput
