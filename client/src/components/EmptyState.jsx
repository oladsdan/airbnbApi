import React from 'react'
import { useNavigate } from 'react-router-dom'

const EmptyState = ({title = "No exact matches", subtitle="Try changing or removing some of your filters", showReset}) => {
    const navigate = useNavigate()
  return (
    <div
        className='h-[60vh] flex flex-col gap-2 justify-center items-center'>
        <span className='text-2xl font-bold'>{title}</span>
        <span className='font-light text-neutral-500'>{subtitle}</span>
        <div className="w-48 mt-4 border border-black outline-1 flex justify-center align-center rounded-[10px] py-3 hover:shadow-xl" >
           {showReset && (
            <button onClick={() => navigate('/')}>Remove all filters</button>
           )}
        </div>

    </div>
  )
}

export default EmptyState