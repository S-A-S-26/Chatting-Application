import React from 'react'
import {MapPin, MessageCircleMore, MessageSquareText, Pin, Search} from 'lucide-react'
import ProfileStrip from './ProfileStrip'

export default function ContactList() {
  const det= ["Sujit Sutar", "Sagar Rite", "Shyam Sutar", "Geeta Sutar", "John Doe", "George Bush", "Putin"]
  return (
    <>
    <div>
        <div className='flex justify-between px-4 md:px-7 border h-24 md:h-28 border-r-0 items-center'>
            <h2 className='text-secondary text-3xl font-normal tracking-tighter flex items-center'>
                <MessageCircleMore strokeWidth={2} size={30}/><span></span>Messages
            </h2>
            <div className='flex'>
                <div className='bg-gray-50 flex p-2 rounded-full transition-all duration-500 group hover:bg-gray-100'>
                    <Search strokeWidth={1.3}className='text-gray-400 transition-all duration-500 group-hover:text-gray-600'/> 
                </div>
            </div>
        </div>
        <div className='overflow-scroll max-h-[calc(100vh-7rem)]'>
            <div>
                <p className='flex justify-start items-center gap-2 py-4 text-gray-400 px-8 text-sm'>
                    <span><Pin className='rotate-45 text-gray-500'strokeWidth={1} size={19} /></span>
                    <span className='tracking-tighter'>Pinned Message</span>
                </p>
                {det.map((val,idx) => (
                    <ProfileStrip key={idx} {...{val}}/>
                ))}
            </div>
            <div>
            <p className='flex justify-start items-center gap-2 py-4 text-gray-400 px-8 text-sm'>
                    <span><MessageSquareText className='text-gray-500'strokeWidth={1} size={19} /></span>
                    <span className='tracking-tighter'>All Messages</span>
            </p>
                {det.map((val,idx) => (
                    <ProfileStrip key={idx} {...{val}}/>
                ))}
            </div>
        </div>
    </div>
    </>
  )
}
