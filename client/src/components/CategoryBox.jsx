import React, { useCallback } from 'react'
import {useSearchParams} from 'react-router-dom'
import qs from 'query-string'


const CategoryBox = ({Icon, label, description, selected}) => {
  

  const [searchParams, setSearchParams] = useSearchParams();
 

  // so we want to be able to add params to the url of each icons click
  const handleClick = useCallback(()=>{
    let currentQuery = {};

    if (searchParams) {
      currentQuery = qs.parse(searchParams.toString())
    }


    setSearchParams({...currentQuery, category:label})

  
    if(searchParams?.get('category')=== label) {
      setSearchParams('')

    }


  }, [label, searchParams, setSearchParams])

  


  return (
    <div
        onClick={handleClick}
        className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transiton cursor-pointer  ${selected ? 'border-b-neutral-800 text-neutral-800': 'border-transparent text-neutral-500'} `}>
        <Icon size={26} />
        <div className="font-medium text-sm">
            {label}
        </div>

    </div>
  )
}

export default CategoryBox 