import React, { useState } from 'react'
import { KeyRound, Phone, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { TLogin } from '../Interfaces/Interface'
import toast from 'react-hot-toast'


export default function Login({setRegView}:{setRegView:(value:boolean)=>void}) {
  const Navigate=useNavigate() 
  
  const [user,setUser]= useState<TLogin>({
    phone: '',
    password: '',
  })

  async function Register(){
    console.log('Login',user,import.meta.env.VITE_BASE_URL)
    let res= await fetch(import.meta.env.VITE_BASE_URL+'/loginuser',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
        })
    console.log(res)
    let data= await res.json()
    console.log("data login",data)
    if (res.status === 200) {
        toast.success(data.msg)
        localStorage.setItem('token',data.token)
        Navigate('/')
    }else{
        toast.error(data.msg)
    } 
  }

  function handleInput (event:React.ChangeEvent<HTMLInputElement>):void {
    setUser({...user,[event.target.name]:event.target.value})
  }

  return (
    <>
        <div className='lg:border-l-2 h-full grid place-items-center '>
            <div className='w-full px-10 max-w-lg grid gap-10'>
                <h2 className='text-4xl tracking-tighter text-blue-900'>Login</h2>
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
                <button className='bg-transparent border-none underline hover:text-blue-400' onClick={()=>setRegView(true)}>
                    Dont have an account?
                </button>
            </div>
        </div>
    </>
  )
}
