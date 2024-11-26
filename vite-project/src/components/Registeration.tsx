import React, { useState } from 'react'
import { KeyRound, Phone, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { TUser } from '../Interfaces/Interface'
import toast from 'react-hot-toast'


export default function Registeration({ setRegView }: { setRegView: (value: boolean) => void }) {
    const Navigate = useNavigate()

    const [user, setUser] = useState<TUser>({
        username: '',
        phone: '',
        password: '',
    })

    async function Register() {
        console.log('Register', user, import.meta.env.VITE_BASE_URL)

        let res = await fetch(import.meta.env.VITE_BASE_URL + '/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        console.log(res)
        let data = await res.json()
        if (res.status === 200) {
            toast.success("Registration Successfull")
            localStorage.setItem('token', data.token)
            Navigate('/')
        } else {
            toast.error(data.msg)
        }
        console.log("data regist", data)
    }

    function handleInput(event: React.ChangeEvent<HTMLInputElement>): void {
        setUser({ ...user, [event.target.name]: event.target.value })
    }

    return (
        <>
            <div className='lg:border-l-2 h-full grid place-items-center '>
                <div className='w-full px-10 max-w-lg grid gap-10'>
                    <h2 className='text-4xl tracking-tighter text-blue-900'>Register</h2>
                    <div className='border-b-2 flex gap-4 p-2 border-gray-400'>
                        <User strokeWidth={0.75} />
                        <input className='w-full outline-none bg-transparent' type="text" placeholder='UserName' name='username' onChange={(e) => handleInput(e)} value={user.username} />
                    </div>
                    <div className='border-b-2 flex gap-4 p-2 border-gray-400'>
                        <Phone strokeWidth={0.75} />
                        <input className='w-full outline-none bg-transparent' type="text" placeholder='Phone No' name='phone' onChange={(e) => handleInput(e)} value={user.phone} />
                    </div>
                    <div className='border-b-2 flex gap-4 p-2 border-gray-400'>
                        <KeyRound strokeWidth={0.75} />
                        <input className='w-full outline-none bg-transparent' type="password" placeholder='Password' name='password' onChange={(e) => handleInput(e)} value={user.password} />
                    </div>
                    <button onClick={Register} className='button-padding text-white tracking-wide mt-6 bg-gradient-to-r from-sky-500 to-indigo-500hover:border-blue-900'>
                        Submit
                    </button>
                    <button className='bg-transparent border-none underline hover:text-blue-400' onClick={() => setRegView(false)}>
                        Back to Login
                    </button>
                </div>
            </div>
        </>
    )
}
