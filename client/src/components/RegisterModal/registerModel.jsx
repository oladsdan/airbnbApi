import React, {useState} from 'react'
import Modal from '../Modals/Modal'
import useRegisterModal from '../../hooks/useRegisterModal'
import RegisterInputs from '../RegisterInputs';
import { useForm} from 'react-hook-form'
import { toast} from 'react-toastify'

// import {FieldValues, SubmitHandler, UseForm} from 'react-hook-form'
// import {useForm} from 'react-hook-form';
import axios from 'axios'
import Buttons from '../Buttons';
//import {AiFillGithub} from 'react-icons/ai
import { FcGoogle } from 'react-icons/fc'
import { BiLogoFacebook } from 'react-icons/bi';
import useLoginModal from '../../hooks/useLoginModal';
const registerModal = () => {
  /* eslint-disable */
  const registerModal = useRegisterModal(); 
  const loginModal = useLoginModal()
  /* eslint-disable */
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, reset, formState: {errors}} = useForm();

  // const { register, handleSubmit, formState: {errors,}} = useForm<FieldValues>({
  //   defaultValues: {
  //     name: '',
  //     email: '',
  //     password: '',
  //   }
  // });

  const onSubmit  = (data) => {
    setIsLoading(true);
    
    axios.post('/api/register', data)
      .then(() => {
        registerModal.onClose();
        reset()
        loginModal.onOpen();
        toast.success("Welcome on board")
      })
      .catch((error) => {
        toast.error("Something went Wrong or check the input fields")
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const handleOpenLoginModal = () => {
    loginModal.onOpen()
    registerModal.onClose()
  }

 

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
  //footer content for the modal
  const footerContent= (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Buttons 
        outline
        label="Continue with Google"
        Icon={FcGoogle}
        onClick={() => {}}/>
      <Buttons 
        outline
        label="Continue with Facebook"
        Icon={BiLogoFacebook}
        onClick={() => {}}/>

      <div className='text-neutral-500 text-center mt-4 font-light'>
        <div className='flex items-center justify-center gap-2'>
          <span>Already have an account?</span>
          <span onClick={handleOpenLoginModal} className='cursor-pointer underline'>Login</span>
        </div>

      </div>

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
        onSubmit={handleSubmit(onSubmit)} 
        body={bodyContent}
        footer = {footerContent} /> )}
        

    </div>
  )
}

export default registerModal