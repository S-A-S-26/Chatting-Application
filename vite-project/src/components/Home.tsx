import React from 'react'
import ContactList from './ContactList'
import Message from './Message'


export default function Home() {
  return (
    <>
    
    <div className='flex grow'>
        <div className='w-full md:w-6/12 xl:w-4/12 2xl-3/12'>
          <ContactList/>
        </div>
        <div className='hidden border md:w-6/12 md:block xl:w-8/12 2xl-9/12'>
          <Message/>
        </div>
    </div>
    </>
  )
}
