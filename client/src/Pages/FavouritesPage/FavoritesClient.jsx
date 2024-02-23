import React from 'react'
import Container from '../../components/Container'
import { ListingCard } from '../../components'

const FavoritesClient = ({listings, currentUser}) => {
  return (
    <Container>
      <div className='flex flex-col gap-3'>
        <span className='text-2xl font-bold'>Favorites</span>
        <span className='font-light text-neutral-500'>List of places you have favorited</span>
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
            />
        ))}
          
      </div>
    </Container>
  )
}

export default FavoritesClient