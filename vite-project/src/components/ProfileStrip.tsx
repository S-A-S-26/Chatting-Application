import { CircleUserRound } from 'lucide-react'
import React from 'react'

export default function ProfileStrip({val}:{val:String}) {
  return (
    <>
        <div className='flex px-7 py-2 items-center'>
            <div className='bg-gray-50 rounded-full p-0 m-0'>
                <CircleUserRound strokeWidth={0.75} size={60} className='h-full w-full text-gray-300'/>
            </div>
            <div className='grow text-left pl-4 grid grid-rows-2'>
                <div className='font-semibold tracking-wide text-gray-900 text-base'>
                    {val}
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
        </div>
    </>
  )
}
