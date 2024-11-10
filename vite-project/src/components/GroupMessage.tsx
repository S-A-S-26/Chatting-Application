import React, { ReactHTMLElement, useEffect, useRef, useState } from 'react'
import TopProfile from './TopProfile'
import { Image, LogOut, Send, Settings, Smile } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from '../store'
import { Skeleton } from '@/components/ui/skeleton'
import ProfileSkeleton from './ProfileSkeleton'
import Messages from './Messages'
import { TChatData, TMessage, TProfile } from '../Interfaces/Interface'
import { Socket } from 'socket.io-client'
import Emojis from './Emojis'
import bgSvg from '../assets/NoMsg.svg'
import GroupMessages from './GroupMessages'

export default function Message({ toggleOtherProfile, setProfileStatus, showProfile, socket, activeChatls, setActiveChatls, onlineUsersList }: { toggleOtherProfile: () => void, showProfile: boolean, setProfileStatus: (value: boolean) => void, socket: Socket | undefined, activeChatls: TProfile, setActiveChatls: (value: []) => void, onlineUsersList: [] }) {
    const Navigate = useNavigate()

    const loggedUser = useSelector((state: IRootState) => state.user)
    const messageProfileData = useSelector((state: IRootState) => state.messageProfileData)
    const [typedMessage, setTypedMessage] = useState<string>('')
    const [chats, setChats] = useState<TChatData>({ messages: [] })
    const msgContainer = useRef<HTMLDivElement | null>(null)
    const showEmoji = useRef<HTMLDivElement | null>(null)

    function scrollMsgContainerbot() {
        console.log("scroll bot")
        if (!msgContainer.current) return
        msgContainer.current.scrollTop = msgContainer.current?.scrollHeight
    }

    //not required for now
    // async function setMessageReadBy(message: TMessage | TMessage[], customChatId = undefined) {
    //     console.log("set message readby", message)
    //     if (!socket) return
    //     if (message) {
    //         if (!customChatId) {
    //             socket.emit("seenstatus", { chat_id: chats._id, message_id: message._id, receiver_id: messageProfileData._id })
    //         } else {
    //             const msgIdList = (message as TMessage[])
    //                 .filter((val: TMessage) => !val.seen && val.sender == messageProfileData._id) // Filter messages that haven't been seen
    //                 .map((val: TMessage) => {
    //                     console.log(val.content)
    //                     return val._id
    //                 });
    //             if (msgIdList.length > 0) {
    //                 const postData = {
    //                     chatId: customChatId,
    //                     messageIds: msgIdList
    //                 }
    //                 console.log("postData", postData)
    //                 const res = await fetch(import.meta.env.VITE_BASE_URL + "/markseen", {
    //                     method: "POST",
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                     },
    //                     body: JSON.stringify(postData)
    //                 })
    //                 const data = await res.json()
    //                 console.log("res.data for seen messages multiple", data)
    //             }
    //         }
    //     }

    // }

    async function fetchUserChat(disable = false) {
        if (!messageProfileData._id) return
        let res = await fetch(import.meta.env.VITE_BASE_URL + "/fetchgroupchats", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                groupName: messageProfileData.username,
            }),
        });
        let chatData = await res.json()
        console.log("chatData from useEffect fetch in messages", chatData)
        if (chatData) {
            setChats(chatData)
            // if (!disable) {
            //     setMessageReadBy(chatData.messages, chatData._id)
            // }
        } else {
            setChats({ messages: [] })
        }
    }
    //main effect required to load chat 
    useEffect(() => {
        console.log('messageProfileData', messageProfileData)
        fetchUserChat()
        if (!socket) return
        console.log("init live Update Seen ")
        socket.emit("joinRoom", messageProfileData.username)
        // socket.on("liveUpdateSeen", (val) => {
        //     console.log("live update Seen")
        //     fetchUserChat(true)
        // })
        return () => {
            // socket.off("liveUpdateSeen")
        }
    }, [messageProfileData])

    useEffect(() => {
        console.log("use effect for socket incoming init ", socket, messageProfileData)
        if (socket) {
            socket.on('roomMessage', (val) => {
                console.log("room message", chats, val)
                if (!chats) return
                console.log("ids", val.room, messageProfileData.username)
                if (val.room == messageProfileData.username) { //** need to add sender/room from backend remaining
                    console.log("chat updated via incomingMsg")
                    setChats({
                        ...chats, messages: [...chats.messages, val.message]
                    })
                    // setMessageReadBy(val.message)
                }
            })
        }
        scrollMsgContainerbot()
        return () => {
            console.log("incoming socket cleanup")
            if (socket) {
                socket.off('roomMessage')
            }
        }
    }, [socket, messageProfileData, chats])

    //this is not needed 
    // useEffect(() => {
    //     if (!socket) return
    //     socket.on("seenstatusset", (val) => {
    //         console.log("seen status set", val)
    //         setChats((prevChats) => {
    //             const updatedChat = { ...prevChats };
    //             const len = updatedChat.messages.length - 1;

    //             if (len >= 0) {
    //                 updatedChat.messages[len].seen = true;
    //             }

    //             console.log("chat updated in seen statusset");
    //             return updatedChat; // Return the updated state
    //         });
    //     })
    //     return () => {
    //         socket.off("seenstatusset")
    //     }
    // }, [socket])


    function logout() {
        localStorage.removeItem('token')
        Navigate('/register')
    }

    //not required
    // async function setUnseenCount(to) {
    //     console.log("to", to)
    //     socket.emit("unseenCount", { id: to, sender: loggedUser._id })
    // }

    async function sendMessagetoServer() {
        console.log("typed message", typedMessage)
        const token = localStorage.getItem("token")
        let payload = {
            "sentBy": loggedUser._id,
            "receiver": messageProfileData._id,
            "room": messageProfileData.username,
            "new": false,
            "participants": [
                loggedUser._id, messageProfileData._id
            ],
            "message": {
                "sender": loggedUser._id,
                "content": typedMessage
            }
        }
        console.log("payload", payload)
        let res = await fetch(import.meta.env.VITE_BASE_URL + '/createGroup', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            },
            body: JSON.stringify(payload),
        })
        let data = await res.json()
        console.log("Sent Message res", data)
        if (res.status == 200) {
            if (chats) {
                console.log("send message to server update")
                setChats({
                    ...chats, messages: [...chats.messages, { sender: loggedUser._id, content: typedMessage, timestamp: new Date().toISOString() }]
                })
            }
            setTypedMessage('')
            // setUnseenCount(messageProfileData._id)
        }
        console.log("chat", chats)
    }

    useEffect(() => {
        console.log("chat after update typed msg", chats)
    }, [chats])

    function sendMessageOnEnter(e: React.KeyboardEvent<HTMLInputElement>): void {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevents the default form submission behavior
            sendMessagetoServer();
        }
    }

    function toggleEmojiWindow() {
        console.log("showEmoji", showEmoji.current.style.bottom)
        if (!showEmoji.current) return
        if (showEmoji.current.style.bottom == '' || showEmoji.current.style.bottom == '-300px') {
            showEmoji.current.style.bottom = '80px'
        } else {
            showEmoji.current.style.bottom = '-300px'
        }
    }

    function addEmojitoMsg(val: string) {
        console.log("addEmojitoMsg")
        setTypedMessage((prev) => {
            return prev + " " + val
        })
    }

    return (
        <>
            {messageProfileData._id ?

                <div className='h-full flex flex-col'>
                    <div className='flex justify-between px-7 border h-28 border-l-0 items-center'>
                        {/* <h2 className='text-mysecondary text-3xl font-normal tracking-tighter'></h2> */}
                        {/* <div>{messageProfileData}</div> */}
                        {messageProfileData._id ?
                            <TopProfile {...{ toggleOtherProfile }} />
                            :
                            <ProfileSkeleton />
                        }
                        < div className='flex gap-2'>
                            <div className=' flex p-2 rounded-full transition-all duration-500 group hover:bg-gray-100'>
                                <button className='bg-transparent p-0 border-none outline-none hover:border-none' onClick={logout}>
                                    <LogOut strokeWidth={1.3} size={22} className='text-gray-400 transition-all duration-500 group-hover:text-gray-600' />
                                </button>
                            </div>
                            <div className=' flex p-2 rounded-full transition-all duration-500 group hover:bg-gray-100'>
                                <button className='bg-transparent p-0 border-none outline-none hover:border-none' onClick={() => setProfileStatus(!showProfile)}>
                                    <Settings strokeWidth={1.3} size={22} className='text-gray-400 transition-all duration-500 group-hover:text-gray-600' />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='bg-mybackground grow flex flex-col '>
                        <div className='h-[calc(100vh-12rem)] overflow-x-auto relative' ref={msgContainer}>
                            {/* {chats && chats.messages.map((val: { content: string, sender: string }, idx: number) => { */}
                            {/*   console.log("idx", idx) */}
                            {/*   let content = val.content */}
                            {/*   return <div key={idx}> */}
                            {/*     {val.content} */}
                            {/*   </div> */}

                            {/* })} */}
                            <GroupMessages {...{ chats }} />
                        </div >
                        <div className='relative z-10'>
                            <div ref={showEmoji} className='m-2 z-1 absolute transition-all duration-500 bottom-[-300px] text-xl bg-white rounded-lg overflow-hidden'><Emojis {...{ addEmojitoMsg }} /></div>
                            <div className='h-20 flex items-center justify-center bg-white relative z-10'>
                                <div className='flex grow gap-3 mx-4 px-8 h-12 items-center rounded-full bg-mybackground relative'>
                                    <button className='bg-transparent p-0 border-none' onClick={toggleEmojiWindow}>
                                        <Smile strokeWidth={1.25} size={22} className='text-gray-400 hover:text-gray-500' />
                                    </button>
                                    <input className='grow bg-mybackground outline-none text-gray-500 text-sm' placeholder='Type a message' onChange={(e) => setTypedMessage(e.target.value)} value={typedMessage} onKeyDown={(e) => sendMessageOnEnter(e)} />
                                    <button className='bg-transparent p-0 border-none' onClick={logout}>
                                        <Image strokeWidth={1.25} size={22} className='text-gray-400 hover:text-gray-500' />
                                    </button>
                                    <button className='bg-transparent p-0 border-none' onClick={sendMessagetoServer}>
                                        <Send strokeWidth={1.25} size={22} className='text-gray-400 hover:text-gray-500' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                : <div className='h-full'><img className='object-cover h-full w-full' src={bgSvg} /></div >}
        </>
    )
}
