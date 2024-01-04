
import React from 'react'
import Container from '../Container'
import { siteLogo } from '../../assets' 
import Search from './Search'
import UserMenu from './UserMenu'

const Navbar = () => {
  return (
    <div className='w-full bg-white shadow-sm z-10'>
        <div className='py-4 border-b-[1px]'>
            <Container>
              <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                  <img className='w-[100px] object-cover' src={siteLogo} alt=" logo"  />
                  <Search />
                  <UserMenu />
              </div>
            </Container>
        </div>
    </div>
  )
}

export default Navbar