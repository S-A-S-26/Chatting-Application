import React from 'react'
import TopProfile from './TopProfile'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Message() {
  const Navigate=useNavigate()

  function logout(){
    localStorage.removeItem('token')
    Navigate('/register')
  }

  return (
    <>
    <div className='h-full flex flex-col'>
        <div className='flex justify-between px-7 border h-28 border-l-0 items-center'>
          {/* <h2 className='text-secondary text-3xl font-normal tracking-tighter'></h2> */}
          <TopProfile/>
          <div className='bg-gray-50 flex p-2 rounded-full transition-all duration-500 group hover:bg-gray-100'>
            <button className='bg-transparent p-0 border-none' onClick={logout}>
              <LogOut strokeWidth={1.3}className='text-gray-400 transition-all duration-500 group-hover:text-gray-600'/> 
            </button>
          </div>
        
        </div>
        <div className='bg-background grow'>

        </div>
    </div>
    </>
  )
}
