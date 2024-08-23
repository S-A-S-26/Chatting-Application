import React, { ChangeEvent, useState } from 'react'
import RegImg from '../assets/blue.jpg'
import { KeyRound, Phone, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { TUser } from '../Interfaces/Interface'


export default function Registeration() {
  const Navigate=useNavigate() 
  
  const [user,setUser]= useState<TUser>({
    username: '',
    phone: '',
    password: '',
  })

  async function Register(){
    console.log('Register',user,import.meta.env.VITE_BASE_URL)
    
    let res= await fetch(import.meta.env.VITE_BASE_URL+'/register',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
        })
    console.log(res)
    if (res.status === 200) {
        alert('Success')
    }else{
        alert('Failed')
    }
    let data= await res.json()
    console.log("data regist",data)
    // Navigate('/')
  }

  function handleInput (event:React.ChangeEvent<HTMLInputElement>):void {
    setUser({...user,[event.target.name]:event.target.value})
  }

  return (
    <>
        <div className='h-full'>
            <div className='h-full grid lg:grid-cols-2 items-center justify-center'>
                <div className='hidden h-screen lg:block'>
                    <img className='object-cover w-full h-full' src={RegImg} />
                </div>
                <div className='lg:border-l-2 h-full grid place-items-center '>
                    <div className='w-full px-10 max-w-lg grid gap-10'>
                        <h2 className='text-4xl tracking-tighter text-gray-900'>Register</h2>
                        <div className='border-b-2 flex gap-4 p-2 border-gray-400'>
                            <User strokeWidth={0.75} />
                            <input className='w-full outline-none bg-transparent' type="text" placeholder='UserName' name='username' onChange={(e)=>handleInput(e)} value={user.username}/>
                        </div>
                        <div className='border-b-2 flex gap-4 p-2 border-gray-400'>
                            <Phone strokeWidth={0.75} />
                            <input className='w-full outline-none bg-transparent' type="text" placeholder='Phone No' name='phone' onChange={(e)=>handleInput(e)} value={user.phone}/>
                        </div>
                        <div className='border-b-2 flex gap-4 p-2 border-gray-400'>
                            <KeyRound strokeWidth={0.75} />
                            <input className='w-full outline-none bg-transparent' type="password" placeholder='Password' name='password' onChange={(e)=>handleInput(e)} value={user.password}/>
                        </div>
                        <button onClick={Register} className='text-white tracking-wide mt-6 bg-gradient-to-r from-sky-500 to-indigo-500hover:border-blue-900'>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
