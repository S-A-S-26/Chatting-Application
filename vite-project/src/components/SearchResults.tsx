import { Frown, Search } from 'lucide-react'
import React from 'react'
import ProfileStrip from './ProfileStrip'

export default function SearchResults({contactList}:{contactList:[]}) {
  return (
    <>
        <p className='flex justify-start items-center gap-2 py-4 text-gray-400 px-8 text-sm'>
            <span><Search className='text-gray-500'strokeWidth={1} size={19} /></span>
            <span className='tracking-tighter'>Search Results...</span>
        </p>
        {/* <div className='flex justify-center'>
            <p className='flex justify-start items-center gap-2 py-4 text-gray-400 px-8 text-sm'>
                <span><Frown className='text-gray-500'strokeWidth={1} size={19} /></span>
                <span className='tracking-tighter'>Not Found</span>
            </p>
        </div> */}
        {
            contactList.map((val,idx) => (
                <ProfileStrip key={idx} {...{'val':val.username}}/>
            ))
        }
    </>
  )
}
