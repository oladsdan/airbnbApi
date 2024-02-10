import React, { useMemo } from 'react'
import { propertyCategories } from '../../components/Navbar/Categories'
import Container from '../../components/Container'
import { ListingHead } from '../../components'
import ListingInfo from './ListingInfo'

const ListingClient = ({listing, currentUser}) => {
    const category = useMemo(() => {
        return propertyCategories.find((item) => item.label === listing.category)
    }, [listing, propertyCategories])

  return (
    <Container>
        <div className="max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-6">
                <ListingHead
                    title={listing.title}
                    imageSrc={listing.imageSrc}
                    locationValue={listing.location.value}
                    id={listing._id}
                    currentUser={currentUser}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                <ListingInfo
                    user={listing?.userId}
                    category={category}
                    description={listing.description}
                    roomCount={listing?.roomCount}
                    guestCount={listing?.guestCount}
                    bathroomCount={listing?.bathroomCount}
                    locationValue={listing.location?.value}
                />
            </div>
        </div>
    </Container>
  )
}

export default ListingClient