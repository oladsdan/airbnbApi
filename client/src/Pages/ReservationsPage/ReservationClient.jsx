import React, { useCallback, useState } from 'react'
import Container from '../../components/Container'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { toast } from 'react-toastify';
import { ListingCard } from '../../components';
import axios from 'axios';
import ReservationCard from '../../components/ResevationCard';



const ReservationClient = ({reservations, currentUser}) => {
    const axiosPrivate = useAxiosPrivate();
    const [deletingId, setDeletingId] = useState("")


    const onCancel = useCallback((id)=>{
        setDeletingId(id);
    
        axiosPrivate.delete(`/api-reservations/${id}`)
        .then(() => {
          toast.success('Reservation cancelled');
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
            <span className='text-2xl font-bold'>Reservations</span>
            <span className='font-light text-neutral-500'>Bookings on your properties</span>
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
            {
              reservations.map((reservation)=> (
                <ReservationCard key={reservation?._id} reservation={reservation} currentUser={currentUser} deletingId={deletingId} onCancel={onCancel} />
              ))
            }
              
          </div>
        </Container>
      )
}

export default ReservationClient