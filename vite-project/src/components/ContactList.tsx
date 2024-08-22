import React from 'react'
import {Search} from 'lucide-react'
import ProfileStrip from './ProfileStrip'

export default function ContactList() {
  const det= ["Sujit Sutar", "Sagar Rite", "Shyam Sutar", "Geeta Sutar", "John Doe", "George Bush", "Putin"]
  return (
    <>
    <div>
        <div className='flex justify-between px-7 border h-28 border-r-0 items-center'>
            <h2 className='text-secondary text-3xl font-normal tracking-tighter'>Messages</h2>
            <div className='flex'>
                <div className='bg-gray-50 flex p-2 rounded-full transition-all duration-700 group hover:bg-gray-100'>
                    <Search strokeWidth={1.3}className='text-gray-400 transition-all duration-700 group-hover:text-gray-600'/> 
                </div>
            </div>
        </div>
        <div className='overflow-scroll max-h-[calc(100vh-7rem)]'>
            <div>
                <p>pinned message</p>
                {det.map((val,idx) => (
                    <ProfileStrip key={idx} {...{val}}/>
                ))}
            </div>
            <div>
            <p>all message</p>
                {det.map((val,idx) => (
                    <ProfileStrip key={idx} {...{val}}/>
                ))}
            </div>
        </div>
    </div>
    </>
  )
}
