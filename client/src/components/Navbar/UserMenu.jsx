import React, { useContext, useState } from 'react'
import {AiOutlineMenu} from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useRegisterModal from '../../hooks/useRegisterModal';
import useLoginModal from '../../hooks/useLoginModal';
import AuthContext from '../../context/AuthProvider';


const UserMenu = () => {
    const {authUser, setAuthUser, setOpenLogin} = useContext(AuthContext)
    console.log("in UserMenu", authUser)


    const [isOpen, setIsOpen] = useState(false)
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    // const toggleOpen = useCallback(() => {
    //     setIsOpen((value) => !value)
    // }, [])

    //functions for the MenuItem modal
    const onClickMenu = (value) => {
        if (value === "signup"){
            /* eslint-disable */
            registerModal.onOpen()
        }

    }
    const handleLogout = () => {
        setAuthUser('')
    }
    const handleLogin =() => {
        setOpenLogin(true)
    }

  return ( 
    <div className='relative'>
        <div className='flex flex-row items-center gap-3'>
            <div onClick={() => {}}
                className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
                    Airbnb your home

            </div>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'>
                    <AiOutlineMenu />
                    <div className='hidden md:block'>
                        <Avatar />
                    </div>

            </div>
        </div>

        {isOpen && (
            <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
                <div className='flex flex-col cursor-pointer'>
                    {authUser?.user ? (
                       <>
                            <MenuItem onClickMenu={()=>{}} setIsOpen={setIsOpen}  label="My trips"/>
                            <MenuItem  onClickMenu={()=>{}} setIsOpen={setIsOpen}   label="My favourites"/>
                            <MenuItem  onClickMenu={()=>{}} setIsOpen={setIsOpen}   label="My  reservations"/>
                            <MenuItem  onClickMenu={()=>{}} setIsOpen={setIsOpen}   label="My properties"/>
                            <MenuItem  onClickMenu={()=>{}} setIsOpen={setIsOpen}   label="My Airbnb my home"/>
                            <hr />
                            <MenuItem  onClickMenu={handleLogout} setIsOpen={setIsOpen}   label="Logout"/>
                         </>
                    ): (

                        <>
                            <MenuItem onClickMenu={loginModal.onOpen} setIsOpen={setIsOpen} setOpenLogin={setOpenLogin(true)} label="Login"/>
                            <MenuItem  onClickMenu={registerModal.onOpen} setIsOpen={setIsOpen}   label="Sign up"/>
                        </>
                    )}
                </div>

            </div>
        )}
    </div>
  )
}

export default UserMenu