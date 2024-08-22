import React from 'react'
import RegImg from '../assets/Chat.jpg'
import { Phone, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Registeration() {
  const Navigate=useNavigate() 
  function Register(){
    Navigate('/')
  }
  return (
    <>
        <div className='h-full'>
            <div className='h-full grid lg:grid-cols-2 items-center justify-center'>
                <div className='hidden h-screen lg:block'>
                    <img className='object-cover w-full h-full' src={RegImg} />
                </div>
                <div className='lg:border-l-2 h-full grid place-items-center'>
                    <div className='w-full px-10 max-w-lg grid gap-10'>
                        <h2 className='text-4xl tracking-tighter text-gray-900'>Register</h2>
                        <div className='border-b-2 flex gap-4 p-2 border-gray-400'>
                            <User strokeWidth={0.75} />
                            <input className='w-full outline-none' type="text" placeholder='UserName' name='username'/>
                        </div>
                        <div className='border-b-2 flex gap-4 p-2 border-gray-400'>
                            <Phone strokeWidth={0.75} />
                            <input className='w-full outline-none' type="text" placeholder='UserName' name='username'/>
                        </div>
                        <button onClick={Register} className='text-white tracking-wide mt-6 bg-red-400 hover:border-red-900'>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
