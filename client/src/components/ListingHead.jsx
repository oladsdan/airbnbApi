import React from 'react'
import useCountries from '../hooks/useCountryHooks'
import HeartButton from './HeartButton';

const ListingHead = ({title, locationValue, imageSrc, id, currentUser}) => {
    const {getByValue} = useCountries();
    const location = getByValue(locationValue);
  return (
    <>
        <div className='flex flex-col gap-2'>
            <span className='text-2xl font-bold'>{title}</span>
            <span className='font-light text-neutral-500'>{`${location?.region}, ${location?.label}`}</span>
        </div>
        <div
            className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
                <img src={imageSrc} alt="image" className='object-cover w-full'/>
                <div className='absolute top-5 right-5'>
                    <HeartButton listingId={id} currentUser={currentUser} />
                </div>

        </div>

    </>
    
  )
}

export default ListingHead