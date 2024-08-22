import React from 'react'
import TopProfile from './TopProfile'

export default function Message() {
  return (
    <>
    <div className='h-full flex flex-col'>
        <div className='flex justify-between px-7 border h-28 border-l-0 items-center'>
          {/* <h2 className='text-secondary text-3xl font-normal tracking-tighter'></h2> */}
          <TopProfile/>
        </div>
        <div className='bg-background grow'>

        </div>
    </div>
    </>
  )
}
