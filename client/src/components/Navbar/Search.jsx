import React from 'react'
import { BiSearch } from 'react-icons/bi'

const Search = () => {
  return (
    <div className='border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer'>
        <div className='flex items-center justify-between'>
            <span className='text-sm font-semibold px-6'>
                Anywhere
            </span>
            <span className='hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center'>
                Any Week
            </span>
            <div className='text-sm pl-6 pr-2 text-gray-600 flex items-center gap-3'>
                <span className='hidden sm:block'>Add Guest</span>
                <div className='p-2 bg-rose-500 rounded-full text-white'>
                    <BiSearch size={18} />
                </div>

            </div>

        </div>
       

    </div>
  )
}

export default Search