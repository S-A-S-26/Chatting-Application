import { Check, CircleUserRound, Info, MessageCircleMore, Phone, User } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { TProfile, TUpdateProfile } from '../Interfaces/Interface';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../store/utils/utils';


export default function ProfileEdit({ userData }: { userData: TProfile }) {
    const [imageKey, setImageKey] = useState(Date.now());
    const [userButton, setUserButton] = useState<boolean>(false);
    const [statusButton, setStatusButton] = useState<boolean>(false);
    const sliceData = useSelector((state) => state.user)
    const dispatch = useDispatch()

    async function changePhoto(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void {
        const file = event.target.files[0]
        if (!file) return;
        console.log("changePhoto", file)
        const formData = new FormData();
        formData.append('_id', userData._id)
        formData.append('filename', file.name)
        formData.append('photo', file)
        let res = await fetch(import.meta.env.VITE_BASE_URL + '/profileupdate', {
            method: 'POST',
            body: formData,
        });

        let data = await res.json()
        console.log("data", data)
        if (data && res.status === 200) {
            console.log('Photo updated successfully')
            dispatch(setUser({ ...sliceData, profile: data._id }))
            toast.success('Photo updated successfully')
            setImageKey(Date.now())
        } else {
            console.error('Failed to update photo')
            toast.error('Failed to update photo')
        }
    }

    async function updateValue(e: React.ChangeEvent<HTMLInputElement>, value: string) {
        if (value === 'status') {
            setStatusButton(true)
        } else if (value === 'name') {
            setUserButton(true)
        }
        dispatch(setUser({ ...sliceData, [e.target.name]: e.target.value }))
    }

    async function updateData(toUpdate: string) {
        let endpoint: string = "/updateusername"
        let payload: TUpdateProfile = { _id: sliceData._id }

        if (toUpdate === 'Status') {
            endpoint = "/updatestatus"
            payload.status = sliceData.status
        } else if (toUpdate == 'User Name') {
            endpoint = "/updateusername"
            payload.username = sliceData.username
        }

        let res = await fetch(import.meta.env.VITE_BASE_URL + endpoint, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer" + localStorage.getItem('token')
            },
            body: JSON.stringify(payload),
        });

        let data = await res.json()
        console.log("data", data)
        if (data && res.status === 200) {
            console.log(`${toUpdate} updated successfully`)
            toast.success(`${toUpdate} updated successfully`)
            setUserButton(false)
            if (toUpdate === 'Status') {
                setStatusButton(false)
            } else if (toUpdate == 'User Name') {
                setUserButton(false)
            }
        } else {
            console.error(`Failed to update ${toUpdate}`)
            toast.error(`Failed to update ${toUpdate}`)
        }
    }
    return (
        <>
            <div className='h-full flex flex-col'>
                <div className='flex justify-between px-4 md:px-7 border h-24 md:h-28 border-r-0 items-center'>
                    <h2 className='text-gray-700 text-3xl font-normal tracking-tighter flex items-center'>
                        <span>Profile</span>
                    </h2>
                </div>
                <div className='overflow-scroll max-h-[calc(100vh-7rem)] bg-mybackground grow text-left no-scroll'>
                    <div className='bg-white flex flex-col place-items-center h-full'>
                        <label className="transition-all duration-1000 rounded-full overflow-hidden h-[250px] w-[250px] border-none bg-transparent relative hover:after:content-['Change\0020Picture'] after:absolute hover:after:text-gray-700 after:-inset-1 hover:after:bg-gray-200 hover:after:opacity-40 after:grid after:items-center after:underline bg-transparent text-center my-4 mt-6">
                            <input hidden type='file' accept='image' onChange={changePhoto} />
                            {
                                sliceData.profile ?
                                    <img className='object-cover w-full h-full' src={`${import.meta.env.VITE_STATIC}${sliceData.profile}?${imageKey}`} />
                                    :
                                    <CircleUserRound strokeWidth={0.2} size={250} className='text-gray-300' />
                            }

                        </label>
                        <div className='m-1 bg-white rounded-xl p-4 px-12 w-full'>
                            <div className='flex items-center gap-3'>
                                <Phone strokeWidth={1.5} size={30} className='text-gray-400' />
                                <div className='w-full'>
                                    <h2 className='text-md tracking-tight text-gray-700'>Contact</h2>

                                    <div className='border-b-[1px] flex gap-4  border-gray-300 select-none'>
                                        <input className='w-full outline-none bg-transparent text-gray-500 ' type="text" placeholder='' name='phone' value={sliceData.phone} readOnly />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='m-1 bg-white rounded-xl p-4 px-12 w-full'>
                            <div className='flex items-center gap-3'>
                                <User strokeWidth={1.5} size={30} className='text-gray-400' />
                                <div className='w-full'>
                                    <h2 className='text-md tracking-tight text-gray-700'>Username</h2>

                                    <div className='border-b-[1px] flex gap-4  border-gray-300 relative'>
                                        <input className='w-full outline-none bg-transparent text-gray-500 py-1' type="text" placeholder='' name='username' value={sliceData.username} onChange={(e) => updateValue(e, 'name')} />
                                        {userButton && <button className='bg-green-100 rounded-full p-1 h-fit hover:bg-green-600 group right-0 top-0 transition-all duration-500' onClick={() => updateData("User Name")}>
                                            <Check size={15} className='text-green-600 group-hover:text-white transition-all duration-500' />
                                        </button>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='m-1 bg-white rounded-xl p-4 px-12  w-full'>
                            <div className='flex items-center gap-3'>
                                <Info strokeWidth={1.5} size={30} className='text-gray-400' />
                                <div className='w-full'>
                                    <h2 className='text-md tracking-tight text-gray-700'>Status</h2>

                                    <div className='border-b-[1px] flex gap-4  border-gray-300 relative'>
                                        <input className='w-full outline-none bg-transparent text-gray-500 resize-none py-1' placeholder='' name='status' value={sliceData.status} onChange={(e) => updateValue(e, 'status')} />
                                        {statusButton && <button className='bg-green-100 rounded-full p-1 h-fit hover:bg-green-600 group right-0 top-0 transition-all duration-500' onClick={() => updateData("Status")}>
                                            <Check size={15} className='text-green-600 group-hover:text-white transition-all duration-500' />
                                        </button>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
