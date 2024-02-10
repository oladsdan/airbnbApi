import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Modal from './Modal'
import useRentModal from '../../hooks/useRentModal'
import { propertyCategories } from '../Navbar/Categories'
import CategoryInput from '../inputs/CategoryInput'
import { appendErrors, useForm, useWatch} from 'react-hook-form';
import CountrySelect from '../inputs/CountrySelect'
import Map from '../Map'
import Counter from '../inputs/Counter'
import ImageUploads from '../inputs/ImageUploads'
import RegisterInputs from '../RegisterInputs'
import { toast } from 'react-toastify'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useNavigate } from 'react-router-dom'



const STEPS = {
    "CATEGORY" : 0,
    "LOCATION" : 1,
    "INFO": 2,
    "IMAGES": 3,
    "DESCRIPTION": 4,
    "PRICE": 5
}


const RentModal = () => {
    const navigate = useNavigate();
    const rentModal = useRentModal()
    const axiosPrivate = useAxiosPrivate();

    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false)
    
    // const {register, handleSubmit, setValue, watch, formState: {errors}} = useForm<import('react-hook-form').FieldValues>({
    //     defaultValues: {
    //         category: '',
    //         location: null,
    //         guestCount: 1,
    //         roomCount: 1,
    //         bathroomCount: 1,
    //         imageSrc: "",
    //         price: 1,
    //         title: '',
    //         description:''
    //     }
    // });

    const {register, handleSubmit, setValue, watch, reset, formState: {errors}} = useForm({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: "",
            price: 1,
            title: '',
            description:''
        }
      });


    const category = watch('category');// we take a look at what category is selected
    const location = watch('location')
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount = watch('bathroomCount')
    const imageSrc = watch('imageSrc')
   

    const [mapLocation, setMapLocation] = useState([])
    
    useEffect(() => {
      
        setMapLocation(location?.latlng)
    
    }, [location])
    
    // const reMapContainer = useCallback(() => {
    //    return (
    //         <>
    //             <Map center={location?.latlng} />
    //         </>
    //    )
    // }, [location])

    // const Map = useMemo(() => import('../Map'), [location])

    //we use another to render
   
    const setCustomValue =(id, value) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const onNext = () => {
        setStep((value) => value + 1)
    }

    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onSubmit = async (data) => {
        if(step !== STEPS.PRICE){
            return onNext()
        }

        setIsLoading(true);
        //we send it to the backend
        await axiosPrivate.post('/api-listing/create', data)
        .then(() => {
            toast.success("Listings Created!");
            reset();
            setStep(STEPS.CATEGORY);
            rentModal.onClose();
            navigate("/")
        })
        .catch(() => {
            toast.error('Something went wrong')
        })
        .finally(()=> {
            setIsLoading(false)
        })
        
        // axios.post('/api/listings', data)
        // .then(()=> {
        //     toast.success("Listings Created!");
        //     router.refresh();
        //     reset();
        //     setStep(STEPS.CATEGORY);
        //     rentModal.onClose();
        // })
        // .catch(() => {
        //     toast.error('Something went wrong')
        // })
        // .finally(() => {
        //     setIsLoading(false)
        // })
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE){
            return 'Create'
        }
        return 'Next'
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }
        return 'Back';
    }, [step])

    let bodyContent = (
        <div className='flex flex-col gap-8'>
             <span className='text-2xl font-bold'>Which fo these best describes your place?</span>
            <span className='font-light text-neutral-500'>Pick a category</span>
            
            <div 
                className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
                    
                    {/* we map on the property Categories */}
                    {propertyCategories.map((item)=> (
                        <div key={item.label} className='col-span-1'>
                            {/* then we render a components */}
                            <CategoryInput
                             onClick={(category) =>setCustomValue('category', category)}
                             selected={category === item.label}
                             label={item.label}
                             Icon={item.icon}/>
                        </div>
                    ))}

            </div>

        </div>
    )

    if(step === STEPS.LOCATION){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <span className='text-2xl font-bold'>Where is your place located?</span>
                <span className='font-light text-neutral-500'>Help guests find you!</span>

                <CountrySelect
                 value={location}
                 onChange={(value) => setCustomValue('location', value)}/>

                {/* <Map center={mapLocation?.latlng} /> */}
                <Map center={mapLocation} />
                {/* {reMapContainer()} */}
               
            </div>

          
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <span className='text-2xl font-bold'>Share some basics about your place</span>
                <span className='font-light text-neutral-500'>what amenities do you have</span>

                <Counter title="Number of guests" subtitle="How many guests do you allow?" 
                 value={guestCount}
                 onChange={(value) => setCustomValue('guestCount', value)}/>
                 <hr />
                <Counter title="Rooms" subtitle="How many rooms do you have?" 
                 value={roomCount}
                 onChange={(value) => setCustomValue('roomCount', value)}/>
                 <hr />
                <Counter title="Bathrooms" subtitle="How many bathrooms do you have?" 
                 value={bathroomCount}
                 onChange={(value) => setCustomValue('bathroomCount', value)}/>

                
            </div>
        )
    }

    // images steps
    if(step === STEPS.IMAGES) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <span className='text-2xl font-bold'>Add a Photo of your place</span>
                <span className='font-light text-neutral-500'>Show guests what your place looks like!</span>

                <ImageUploads value={imageSrc} onChange={(value) => setCustomValue('imageSrc', value)} />

            </div>
        )

    }

    //Description
    if(step === STEPS.DESCRIPTION){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <span className='text-2xl font-bold'>How would you describe your place?</span>
                <span className='font-light text-neutral-500'>Short and sweet works best</span>

                {/* we are using registerinputs as a resuable components */}
                <RegisterInputs 
                    id="title"
                    label="title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />

                <RegisterInputs 
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />

            </div>
        )
    }


    if (step === STEPS.PRICE){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                 <span className='text-2xl font-bold'>Now, set your price?</span>
                <span className='font-light text-neutral-500'>How much do you charge per night?</span>

                <RegisterInputs
                    id="price"
                    label="price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />

            </div>
        )
    }
  
  return (
    <Modal 
     isOpen={rentModal.isOpen}
     onClose={rentModal.onClose}
     onSubmit={handleSubmit(onSubmit)}
     actionLabel={actionLabel}
     secondaryActionLabel={secondaryActionLabel}
     secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
     title="Airbnb your home!"
     body={bodyContent}
     />
     
  )
}

export default RentModal