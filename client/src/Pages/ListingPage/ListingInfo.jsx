import React from 'react'
import useCountries from '../../hooks/useCountryHooks'
import { Avatar, Map } from '../../components';
import ListingCategory from './ListingCategory';

const ListingInfo = ({user, category, description, roomCount, guestCount, bathroomCount, locationValue}) => {
    const {getByValue} =useCountries();
    const coordinates = getByValue(locationValue)?.latlng

  return (
    <div className='col-span-4 flex flex-col gap-8'>
        <div className="flex flex-col gap-2">
            <div
                className='text-xl font-semibold flex flex-row items-center gap-2'
            >
                <div>Hosted by {user}</div>
                <Avatar src={" "} />
            </div>
            <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                <div>
                    {guestCount} guests
                </div>
                <div>
                    {roomCount} rooms
                </div>
                <div>
                    {bathroomCount} bathrooms
                </div>
            </div>
        </div>
        <hr />
        {category && (
            <ListingCategory icon={category.icon}
                label={category?.label}
                description={category?.description} />
        )}
        <hr />
      <div className="
      text-lg font-light text-neutral-500">
        {description}
      </div>
      <hr />
        <Map center={coordinates} />
    </div>
  )
}

export default ListingInfo