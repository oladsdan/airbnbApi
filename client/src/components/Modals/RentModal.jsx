import React, { useMemo, useState } from 'react'
import Modal from './Modal'
import useRentModal from '../../hooks/useRentModal'
import { propertyCategories } from '../Navbar/Categories'
import CategoryInput from '../inputs/CategoryInput'
import { useForm} from 'react-hook-form';
import CountrySelect from '../inputs/CountrySelect'
import Map from '../Map'

const STEPS = {
    "CATEGORY" : 0,
    "LOCATION" : 1,
    "INFO": 2,
    "IMAGES": 3,
    "DESCRIPTION": 4,
    "PRICE": 5
}


const RentModal = () => {
    const rentModal = useRentModal()

    const [step, setStep] = useState(STEPS.CATEGORY);
    
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

    const {register, handleSubmit, setValue, watch, formState: {errors}} = useForm();

    const category = watch('category');// we take a look at what category is selected
    const location = watch('location')

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

                <Map />
               
            </div>

          
        )
    }
  
  return (
    <Modal 
     isOpen={rentModal.isOpen}
     onClose={rentModal.onClose}
     onSubmit={onNext}
     actionLabel={actionLabel}
     secondaryActionLabel={secondaryActionLabel}
     secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
     title="Airbnb your home!"
     body={bodyContent}
     />
     
  )
}

export default RentModal