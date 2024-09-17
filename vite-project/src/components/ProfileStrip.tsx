import { CircleUserRound } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setMessageUser } from "../store/utils/messageprofile"
import { TProfile } from '../Interfaces/Interface';

export default function ProfileStrip({ val }: { val: TProfile }) {
    const dispatch = useDispatch()

    async function setMessageProfile(userInfo: TProfile) {
        dispatch(setMessageUser(
            //{
            //    _id: data.user._id,
            //    username: data.user.username,
            //    phone: data.user.phone,
            //    status: data.user.status,
            //    profile: data.user.profile,
            //    pinned: data.user.pinned
            //}
            userInfo
        )
        )

    }

    return (
        <>
            <div className='flex px-7 py-2 items-center transition-all duration-500 hover:bg-gray-100' onClick={() => setMessageProfile(val)}>
                {val.profile ?
                    <div className='h-[60px] w-[60px] rounded-full overflow-hidden'>
                        <img className='object-cover w-full h-full' src={import.meta.env.VITE_STATIC + val.profile} />
                    </div>
                    :
                    <div className='bg-gray-50 rounded-full p-0 m-0'>
                        <CircleUserRound strokeWidth={0.75} size={60} className='h-full w-full text-gray-300' />
                    </div>
                }
                <div className='grow text-left pl-4 grid grid-rows-2'>
                    <div className='font-semibold tracking-wide text-gray-900 text-base'>
                        {val.username}
                    </div>
                    <div className='text-gray-500 text-sm'>
                        last seen 10 mins ago
                    </div>
                </div>
                <div className='grid grid-rows-2 justify-start'>
                    <div className='tracking-tighter text-gray-500 text-sm'>
                        05:11
                        <span className='ml-2'>
                            PM
                        </span>
                    </div>
                    <div className='flex justify-end'>
                        <div className='text-white bg-red-500 rounded-full w-4 h-4 text-xs'>
                            4
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
