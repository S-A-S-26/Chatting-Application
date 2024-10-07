import { useSelector } from 'react-redux'
import { TChatData } from '../Interfaces/Interface'
import { IRootState } from '@/store'
import { useRef, useState } from 'react'
import date from 'date-and-time';

export default function Messages({ chats }: { chats: TChatData }) {
    const loggedUser = useSelector((state: IRootState) => state.user)
    const prevDate = useRef<undefined | string>(undefined)
    const currentDate = useRef<undefined | string>(undefined)

    const [dateInfo, setDateInfo] = useState(null)

    function getTime(timestamp: string, flag = true) {

        console.log("flag/timestamp", flag, timestamp, prevDate.current)
        let modDate = null
        let fmtDate;
        // Create a new Date object
        const dateObject = new Date(timestamp);

        // Extract date components (YYYY-MM-DD)
        const dateobj = dateObject.toISOString().split('T')[0];
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

    return (
        <>
            <div className='h-full py-8'>
                {chats && chats.messages.map((val: { content: string, sender: string, timestamp: string }, idx: number) => {
                    console.log("idx", idx)
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
                                <div className={`max-w-[50%] p-3  rounded-xl flex gap-4 ${loggedUser._id == val.sender ? 'bg-mysecondary text-white rounded-tr-none' : 'rounded-tl-none bg-white'}`} >
                                    <div className='text-sm'>
                                        {val.content}
                                    </div>
                                    <div className={`${loggedUser._id == val.sender ? 'text-white' : 'text-gray-600'} text-xs grid items-end`} >
                                        <div>
                                            {val.timestamp ? getTime(val.timestamp) : ""}
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
}
