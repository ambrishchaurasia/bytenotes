import React from 'react'

const EmptyCard = ({imgSrc,message}) => {
  return (
    <div className='flex flex-col  items-center justify-center mt-40'>
      <img src={imgSrc} alt="No Notes" className='w-64 mx-auto'/>
      <p className="w-1/2 text-sm font-bold
       text-slate-800 text-center leading-7 mt-5">
        {message}
      </p>
    </div>
  )
}

export default EmptyCard
