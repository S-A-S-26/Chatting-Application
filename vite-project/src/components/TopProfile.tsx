import { CircleUserRound } from 'lucide-react'
import React from 'react'
import prof1 from '../assets/dummy1.jpg'
import { IRootState } from '../store'
import { Skeleton } from "@/components/ui/skeleton"
import { useSelector } from 'react-redux'

export default function TopProfile({ toggleOtherProfile }: { toggleOtherProfile: () => void }) {
    const messageProfileData = useSelector((state: IRootState) => state.messageProfileData)
    return (
        <>
            <div className='flex py-2 items-center'>
                <div className='bg-gray-50 w-[65px] h-[65px] rounded-full p-0 m-0 overflow-hidden' onClick={toggleOtherProfile}>
                    {messageProfileData.profile ?
                        <img className='object-cover w-full h-full' src={import.meta.env.VITE_STATIC + messageProfileData.profile} />
                        :
                        <CircleUserRound strokeWidth={0.75} size={75} className='h-full w-full text-gray-300' />
                    }
                </div>
                <div className='grow text-left pl-6 grid grid-rows-2'>
                    <div className='tracking-normal text-gray-700 text-xl '>
                        {messageProfileData.username}
                    </div>
                    <div className='text-gray-500 text-sm'>
                        {messageProfileData.status}
                    </div>
                </div>
                {/* <div className='grid grid-rows-2 justify-start'>
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
            </div> */}
            </div>
        </>
    )
}
