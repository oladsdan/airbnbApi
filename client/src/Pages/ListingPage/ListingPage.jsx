import React, { useMemo } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState, useContext } from 'react'
import { toast } from 'react-toastify'
import AuthContext from '../../context/AuthProvider'
import ListingClient from './ListingClient'

const ListingPage = () => {
    const {listingId} = useParams()
    const [listingData, setListingData] = useState("")
    const [loading, setLoading] = useState(true)
    const {authUser} = useContext(AuthContext)
    
    useMemo(async () => {
        await axios.get(`/api-listing/listing/${listingId}`)
        .then((response) => {
            setListingData(response?.data)
            setLoading(false)
        })
        .catch((error) => {
            toast.error("try again")

        })

    }, [listingId])

    

    if(loading){
        return (
            <div>....Loading</div>
        )
    }

  return (
    <div className='p-5'>
        <ListingClient 
            listing={listingData}
            currentUser={authUser?.user?.userId}
            
        />
    </div>
  )
}

export default ListingPage