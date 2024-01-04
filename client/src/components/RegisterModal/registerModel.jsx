import React, {useState} from 'react'
import Modal from '../Modals/Modal'
import useRegisterModal from '../../hooks/useRegisterModal'
import RegisterInputs from '../RegisterInputs';
import {useForm} from 'react-hook-form';
//import axios from 'axios
//import {AiFillGithub} from 'react-icons/ai
//import {FcGoogle} from 'react-icons/fc
//import {FieldValues, SubmitHandler, UseForm} from 'react-hook-form'
const registerModal = () => {
  /* eslint-disable */
  const registerModal = useRegisterModal(); 
  /* eslint-disable */
  const [isLoading, setIsLoading] = useState()

  const { register, handleSubmit, formState: {errors}} = useForm();

  // const { register, handleSubmit, formState: {errors,}} = useForm<FieldValues>({
  //   defaultValues: {
  //     name: '',
  //     email: '',
  //     password: '',
  //   }
  // });

  // const onSubmit : SubmitHandler<FieldValues> = (data) => {
  //   setIsLoading(true);
    
  //   axios.post('/api/register', data)
  // }

  const bodyContent = (
    <div className='flex flex-col gap-6'>
      <span className='text-2xl font-bold'>Welcome to Airbnb</span>
      <span className='font-light text-neutral-500'>Create an Account</span>

      {/* input formdata */}
      <RegisterInputs 
        id="email"
        label="Email"
        disabled={isLoading}
        errors={errors}
        required
        register={register}
         /> 
      <RegisterInputs 
        id="name"
        label="Name"
        disabled={isLoading}
        errors={errors}
        required
        register={register}
         /> 
      <RegisterInputs 
        id="password"
        label="password"
        type="password"
        disabled={isLoading}
        errors={errors}
        required
        register={register}
         /> 
    </div>

  )

  return (
    <div>
      {registerModal.isOpen && (
      <Modal 
        disabled={isLoading}
        title="Register"
        actionLabel="Continue"
        isOpen={registerModal.isOpen}
        onClose={registerModal.onClose} 
        body={bodyContent} /> )}

    </div>
  )
}

export default registerModal