import React, { ChangeEvent, useState } from 'react'
import RegImg from '../assets/blue.jpg'
import Registeration from './Registeration'
import Login from './Login'



export default function AuthSection() {
  const [regView,setRegView] = useState<boolean>(false)

  return (
    <>
        <div className='h-full'>
            <div className='h-full grid lg:grid-cols-2 items-center justify-center'>
                <div className='hidden h-screen lg:block'>
                    <img className='object-cover w-full h-full' src={RegImg} />
                </div>
                {regView? <Registeration {...{setRegView}}/>:<Login {...{setRegView}}/>}
            </div>
        </div>
    </>
  )
}
