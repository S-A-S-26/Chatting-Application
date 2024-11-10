import { useSelector } from 'react-redux'
import { TChatData } from '../Interfaces/Interface'
import { IRootState } from '@/store'
import { useEffect, useRef, useState } from 'react'
import date from 'date-and-time';
import React from 'react';
import { Check, CheckCheck } from 'lucide-react';

const GroupMessages = React.memo(function({ chats }: { chats: TChatData }) {
    const loggedUser = useSelector((state: IRootState) => state.user)
    const prevDate = useRef<undefined | string>(undefined)
    const currentDate = useRef<undefined | string>(undefined)

    const [dateInfo, setDateInfo] = useState(null)

    useEffect(() => {
        console.log("use Effect ran for prevDate reset")
        prevDate.current = undefined
    }, [chats])

    function getTime(timestamp: string, flag = true) {

        let modDate = null
        let fmtDate;
        // Create a new Date object
        const dateObject = new Date(new Date(timestamp).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
        console.log("dateObject", dateObject, dateObject.toISOString())
        // Extract date components (YYYY-MM-DD)
        // const dateobj = dateObject.toISOString().split('T')[0];
        const dateobj = dateObject.toLocaleDateString('en-CA')
        if (!flag) {
            console.log("currentdate/previous date", dateobj, prevDate.current)
        }
        if ((prevDate.current != dateobj) || !prevDate.current) {
            modDate = dateobj
            fmtDate = date.format(dateObject, 'MMMM D,YYYY')
        }
        prevDate.current = dateobj
        // Extract time components (HH:MM:SS)
        // const time = dateObject.toTimeString().split(' ')[0];  // You can use `slice(0, 8)` if you want just HH:MM:SS without the time zone info
        let hours = dateObject.getHours();
        const minutes = dateObject.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert 24-hour format to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // If hour is 0, set it to 12

        // Format the time in 12-hour format
        const time = `${hours}:${minutes} ${ampm}`;
        // console.log("Date:", date); // "2024-10-03"
        // console.log("Time:", time);
        if (flag) {
            return time
        } else {
            console.log("modDate", modDate)
            currentDate.current = fmtDate
            return modDate
        }
    }

    function checkNextSender(index: number) {
        if (index == 0) return true
        if (chats.messages[index - 1].sender != chats.messages[index].sender) {
            return true
        } else {
            return false
        }
    }

    return (
        <>
            <div className='h-full py-8'>
                {chats && chats.messages.map((val: { content: string, sender: string, timestamp: string }, idx: number) => {
                    console.log("msg", val.content)
                    return (
                        <div key={idx}>
                            {getTime(val.timestamp, false) ? (
                                <>
                                    <div className='flex justify-center'>
                                        <div className='text-xs text-gray-500 bg-white rounded-lg p-2 mb-4'>{currentDate.current}</div>
                                    </div>
                                </>
                            ) : null}
                            <div className={`flex my-4 mx-4 ${loggedUser._id == val.sender ? 'justify-end' : 'justify-start'}`}>
                                <div className='flex gap-4'>
                                    {(checkNextSender(idx) && !(loggedUser._id == val.sender)) &&
                                        < div className='rounded-full w-10 h-10 overflow-hidden'>
                                            <img className='w-full h-full object-cover' src={import.meta.env.VITE_STATIC + val.profile} />
                                        </div>
                                    }
                                    <div className=''>

                                        {checkNextSender(idx) && !(loggedUser._id == val.sender) &&
                                            <div className='text-left text-sm font-bold p-2'>{val.username}</div>
                                        }
                                        <div className={`${!checkNextSender(idx) ? 'ml-14' : ''} p-3 rounded-xl flex gap-4 ${loggedUser._id == val.sender ? 'bg-mysecondary text-white rounded-tr-none' : 'rounded-tl-none bg-white'}`} >
                                            <div className='text-sm text-left'>
                                                {val.content}
                                            </div>
                                            <div className={`${loggedUser._id == val.sender ? 'text-white' : 'text-gray-600'} text-xs grid items-end`} >
                                                <div>
                                                    {val.timestamp ? getTime(val.timestamp) : ""}
                                                </div>
                                                {loggedUser._id == val.sender &&
                                                    < div className='grid justify-end'>
                                                        {val.seen ? <CheckCheck size={16} /> : <Check className={`${loggedUser._id == val.sender ? 'text-white' : 'text-gray-400'}`} size={14} strokeWidth={3} />}
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )

                })}
            </div >
        </>
    )
})
export default GroupMessages
