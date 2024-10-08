import React, { useEffect, useState } from 'react'
import { MapPin, MessageCircleMore, MessageSquareText, Pin, Search } from 'lucide-react'
import ProfileStrip from './ProfileStrip'
import ProfileEdit from './ProfileEdit'
import { TProfile } from '../Interfaces/Interface'
import ExpandableSearch from './ExpandableSearch'
import SearchResults from './SearchResults'
import { useSelector } from 'react-redux'
import { IRootState } from '@/store'
import { Socket } from 'socket.io-client'

export default function ContactList({ showProfile, userData, socket }: { showProfile: boolean, userData: TProfile, socket: Socket | undefined }) {
    const det = ["Sujit Sutar", "Sagar Rite", "Shyam Sutar", "Geeta Sutar", "John Doe", "George Bush", "Putin"]
    const [activeChatls, setActiveChatls] = useState<TProfile[]>([])
    const [contactList, setContactList] = useState<[]>([])
    const [showSearch, setShowSearch] = useState<boolean>(false)
    const [onlineUsersList, setOnlineUsers] = useState<object>([])

    const sliceData = useSelector((state: IRootState) => state.user)

    useEffect(() => {
        console.log("useEffect from Contactlist fetching profiles")
        fetchActiveContacts()
    }, [])

    useEffect(() => {
        console.log("contact list socket useEffect")
        if (!socket) return
        console.log("contact list socket init")
        socket.on("user_online_status", (val: {}) => {
            console.log("user online status", val)
            setOnlineUsers(val)
        })
        async function initOnlineStatus() {
            console.log("initOnlineStatus")
            let res = await fetch(import.meta.env.VITE_BASE_URL + '/getonlineusers')
            let data = await res.json()
            console.log("online data fetch", data)
            setOnlineUsers(data.online)
        }
        initOnlineStatus()
    }, [socket])

    async function searchPhone(value: string) {
        let res = await fetch(import.meta.env.VITE_BASE_URL + "/searchuser?phone=" + value)
        let data = await res.json()
        console.log("searchPhone", data)
        if (data) {
            setContactList(data)
        }
    }

    async function fetchActiveContacts() {
        let res = await fetch(import.meta.env.VITE_BASE_URL + "/userchatprofiles")
        let data = await res.json()
        setActiveChatls(data)
        console.log("active contacts", data)
    }

    return (
        <>
            {showProfile ?
                <ProfileEdit {...{ userData }} />
                :
                <div>
                    <div className='flex justify-between px-4 md:px-7 border h-24 md:h-28 border-r-0 items-center'>
                        <h2 className='text-mysecondary text-3xl font-normal tracking-tighter flex items-center'>
                            <MessageCircleMore strokeWidth={2} size={30} /><span></span>Messages
                        </h2>
                        <ExpandableSearch {...{ searchPhone, setShowSearch, setContactList }} />
                    </div>
                    {
                        showSearch ? <SearchResults {...{ contactList, onlineUsersList }} /> :
                            <>
                                <div className='overflow-scroll max-h-[calc(100vh-7rem)] no-scroll'>
                                    <>{sliceData.pinned.length > 0 &&
                                        <div>
                                            <p className='flex justify-start items-center gap-2 py-4 text-gray-400 px-8 text-sm'>
                                                <span><Pin className='rotate-45 text-gray-500' strokeWidth={1} size={19} /></span>
                                                <span className='tracking-tighter'>Pinned Message</span>
                                            </p>
                                            {activeChatls.map((val, idx) => (
                                                <ProfileStrip key={idx} {...{ val, onlineUsersList }} />
                                            ))}
                                        </div>
                                    }</>
                                    <div>
                                        <p className='flex justify-start items-center gap-2 py-4 text-gray-400 px-8 text-sm'>
                                            <span><MessageSquareText className='text-gray-500' strokeWidth={1} size={19} /></span>
                                            <span className='tracking-tighter'>All Messages</span>
                                        </p>
                                        {activeChatls.map((val, idx) => {
                                            if (sliceData._id != val._id) {
                                                return < ProfileStrip key={idx} {...{ val, onlineUsersList }} />
                                            }
                                        })}
                                    </div>
                                </div>
                            </>
                    }
                </div>}
        </>
    )
}
