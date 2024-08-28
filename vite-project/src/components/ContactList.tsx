import React, { useState } from 'react'
import {MapPin, MessageCircleMore, MessageSquareText, Pin, Search} from 'lucide-react'
import ProfileStrip from './ProfileStrip'
import ProfileEdit from './ProfileEdit'
import { TProfile } from '../Interfaces/Interface'
import ExpandableSearch from './ExpandableSearch'

export default function ContactList({showProfile,userData}:{showProfile:boolean,userData:TProfile}) {
  const det= ["Sujit Sutar", "Sagar Rite", "Shyam Sutar", "Geeta Sutar", "John Doe", "George Bush", "Putin"]
  const [contactList,setContactList] = useState([])

  async function searchPhone(value:string){
    let res=await fetch(import.meta.env.VITE_BASE_URL+"/searchuser?phone="+value)
    let data= await res.json()
    console.log("searchPhone",data)
    if (data){
        setContactList(data)
    }
  }

  return (
    <>
        {showProfile?
        <ProfileEdit {...{userData}}/>
        :
        <div>
            <div className='flex justify-between px-4 md:px-7 border h-24 md:h-28 border-r-0 items-center'>
                <h2 className='text-secondary text-3xl font-normal tracking-tighter flex items-center'>
                    <MessageCircleMore strokeWidth={2} size={30}/><span></span>Messages
                </h2>
                <ExpandableSearch {...{searchPhone}}/>
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
        </div>}
    </>
  )
}
