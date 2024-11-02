import { IRootState } from '@/store';
import { Check, CircleUserRound, Info, MessageCircleMore, Phone, User } from 'lucide-react'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
export default function OtherUserDetail() {
    const messageProfileData = useSelector((state: IRootState) => state.messageProfileData)
    const [imageKey, setImageKey] = useState(Date.now());

    return (
        <>
            <div className='h-full flex flex-col bg-white'>
                <div className='flex justify-between px-6 md:px-7 border-b-[1px] h-24 md:h-28 items-center'>
                    <h2 className='text-gray-600 text-2xl p-4 font-normal tracking-tighter flex items-center'>
                        <span>User Info</span>
                    </h2>
                </div>
                <div className='overflow-scroll h-[calc(100vh-7rem)] bg-mybackground grow text-left no-scroll'>
                    <div className='pt-4 bg-white flex flex-col place-items-center h-full'>
                        <div className=" rounded-full overflow-hidden h-[250px] w-[250px] border-none bg-transparent relative">
                            {
                                messageProfileData.profile ?
                                    <img className='object-cover w-full h-full' src={`${import.meta.env.VITE_STATIC}${messageProfileData.profile}`} />
                                    :
                                    <CircleUserRound strokeWidth={0.2} size={250} className='text-gray-300' />
                            }
                        </div>
                        <div className='m-1 bg-white rounded-xl p-4 px-12 w-full'>
                            <div className='flex items-center gap-3'>
                                <Phone strokeWidth={1.5} size={30} className='text-gray-400' />
                                <div className='w-full'>
                                    <h2 className='text-md tracking-tight text-gray-700'>Contact</h2>

                                    <div className='border-b-[1px] flex gap-4  border-gray-300 select-none'>
                                        <input className='w-full outline-none bg-transparent text-gray-500 ' type="text" placeholder='' name='phone' value={messageProfileData.phone} readOnly />
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
                                        <input className='w-full outline-none bg-transparent text-gray-500 py-1' type="text" placeholder='' name='username' value={messageProfileData.username} disabled />
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
                                        <input disabled className='w-full outline-none bg-transparent text-gray-500 resize-none py-1' placeholder='' name='status' value={messageProfileData.status} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )

}
