import { CircleUserRound } from 'lucide-react'
import React from 'react'
import prof1 from '../assets/dummy1.jpg'

export default function TopProfile() {
  return (
    <>
        <div className='flex px-7 py-2 items-center'>
            <div className='bg-gray-50 w-[75px] h-[75px] rounded-full p-0 m-0 overflow-hidden border-2'>
                {/* <CircleUserRound strokeWidth={0.75} size={75} className='h-full w-full text-gray-300'/> */}
                <img className='object-cover w-full h-full' src={prof1} />
            </div>
            <div className='grow text-left pl-6 grid grid-rows-2'>
                <div className='tracking-normal text-gray-700 text-2xl tracking-normal'>
                    Sujit Sutar
                </div>
                <div className='text-gray-500 text-sm'>
                    Available
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
