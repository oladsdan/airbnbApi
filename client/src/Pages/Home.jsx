import React, { useEffect, useState, useContext } from 'react'
import Container from '../components/Container'
import { EmptyState, ListingCard } from '../components';
import axios from 'axios';
import AuthContext from '../context/AuthProvider';


const Home = () => {
  const {authUser} = useContext(AuthContext);
  const [listings, setListings] = useState("")
  const currentUser = {"id":authUser?.user?.userId, 
                        "favoriteIds": authUser?.user?.favoriteId}
  // console.log(listings)
  //here we reduced the filter
  // const getAllListings = async () => {
  //   const response = await axios.get('/api-listing/allListings')
  //   const data = await JSON.stringify(response);
  //   setListings(data)
  //   console.log(listings)
  // }
  const fetchData = async() => {
    await axios.get('/api-listing/allListings')
    .then((response) => {
      setListings(response?.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    let interval = setInterval(() => {
      fetchData();
    }, 10000)
    return () => {
      clearInterval(interval);
    }
  }, []);

  // console.log(listings)
  // console.log("this is authUser")
  // console.log(authUser)

 
 
  if (listings.length === 0) {
    return (
      <div>
        <EmptyState showReset />
      </div>
    )
  }



  return (
    <Container>
      <div className='p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-col-5 2xl:grid-cols-6 gap-6'>
        {listings.map((listing) => {
          return (
            <ListingCard key={listing?.title} currentUser={authUser?.user?.userId} data={listing}/>
          )
        })}

      </div>
    </Container>
  )
}

export default Home