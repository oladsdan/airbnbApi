import React, { useCallback, useState } from 'react'
import Container from '../../components/Container'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { toast } from 'react-toastify';
import { ListingCard } from '../../components';
import axios from 'axios';

const PropertiesClient = ({listings, currentUser}) => {
  const axiosPrivate = useAxiosPrivate();
  const [deletingId, setDeletingId] = useState("")



  const onCancel = useCallback((id)=>{
    setDeletingId(id);

    axiosPrivate.delete(`/api-listing/${id}`)
    .then(() => {
      toast.success('Propety Deleted');
    })
    .catch((error) => {
      toast.error(error?.response?.data?.error)
    })
    .finally(()=>{
      setDeletingId('')
    })

  },[])


  return (
    <Container>
      <div className='flex flex-col gap-3'>
        <span className='text-2xl font-bold'>Properties</span>
        <span className='font-light text-neutral-500'>This are your Properties</span>
      </div>
      <div className='
      mt-10
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      2xl:grid-cols-6
      gap-8'>
        {listings.map((listing) => (
            <ListingCard 
                currentUser={currentUser}
                key={listing?._id}
                data={listing}
                actionId={listing?._id}
                onAction={onCancel}
                disabled={deletingId === listing._id}
                actionLabel="Cancel Properties"
                
            />
        ))}
        

      </div>
    </Container>
  )
}

export default PropertiesClient