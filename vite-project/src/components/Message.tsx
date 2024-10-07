import React, { ReactHTMLElement, useEffect, useState } from 'react'
import TopProfile from './TopProfile'
import { Image, LogOut, Send, Settings, Smile } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IRootState } from '../store'
import { Skeleton } from '@/components/ui/skeleton'
import ProfileSkeleton from './ProfileSkeleton'
import Messages from './Messages'
import { TChatData } from '../Interfaces/Interface'
import { Socket } from 'socket.io-client'

export default function Message({ setProfileStatus, showProfile, socket }: { showProfile: boolean, setProfileStatus: (value: boolean) => void, socket: Socket | undefined }) {
  const Navigate = useNavigate()

  const loggedUser = useSelector((state: IRootState) => state.user)
  const messageProfileData = useSelector((state: IRootState) => state.messageProfileData)
  const [typedMessage, setTypedMessage] = useState<string>('')
  const [chats, setChats] = useState<TChatData>({messages:[]})

  //this is just for dev purpose to check what value i get
  useEffect(() => {
    console.log('messageProfileData', messageProfileData)
    async function fetchUserChat() {
      if (!messageProfileData._id) return
      let res = await fetch(import.meta.env.VITE_BASE_URL + "/fetchchats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          participants: [loggedUser._id, messageProfileData._id],
        }),
      });
      let chatData = await res.json()
      console.log("chatData from useEffect fetch in messages", chatData)
      if (chatData) {
        setChats(chatData)
      }else{
        setChats({messages:[]})
      }
    }
    fetchUserChat()
  }, [messageProfileData])

  useEffect(()=>{
    console.log("monitor messageProfileData",messageProfileData)
  },[messageProfileData])

  useEffect(() => {
    console.log("use effect for socket incoming init ",socket,messageProfileData)
    if (!socket) return
    socket.on('incomingMsg', (val) => {
      console.log("incoming Msg", chats,val)
      console.log("previous msg in chat",chats)
      if (!chats) return
      console.log("ids",val.sender , messageProfileData)
      if (val.sender == messageProfileData._id){
        setChats({ ...chats, messages: [...chats.messages, val.message]
      })
      }
    })
  }, [socket])

  function logout() {
    localStorage.removeItem('token')
    Navigate('/register')
  }

  async function sendMessagetoServer() {
    console.log("typed message", typedMessage)
    const token = localStorage.getItem("token")
    let payload = {
      "sentBy": loggedUser._id,
      "receiver": messageProfileData._id,
      "participants": [
        loggedUser._id, messageProfileData._id
      ],
      "message": {
        "sender": loggedUser._id,
        "content": typedMessage
      }
    }
    console.log("payload", payload)
    let res = await fetch(import.meta.env.VITE_BASE_URL + '/sendmessage', {
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
        setChats({
          ...chats, messages: [...chats.messages, { sender: loggedUser._id, content: typedMessage }]
        })
      }
      setTypedMessage('')

    }
    console.log("chat", chats)
  }

  return (
    <>
      <div className='h-full flex flex-col'>
        <div className='flex justify-between px-7 border h-28 border-l-0 items-center'>
          {/* <h2 className='text-mysecondary text-3xl font-normal tracking-tighter'></h2> */}
          {/* <div>{messageProfileData}</div> */}
          {messageProfileData._id ?
            <TopProfile />
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
        <div className='bg-mybackground grow flex flex-col'>
          <div className='h-[calc(100vh-12rem)] overflow-x-auto'>
            {/* {chats && chats.messages.map((val: { content: string, sender: string }, idx: number) => { */}
            {/*   console.log("idx", idx) */}
            {/*   let content = val.content */}
            {/*   return <div key={idx}> */}
            {/*     {val.content} */}
            {/*   </div> */}

            {/* })} */}
            <Messages {...{ chats }} />
          </div >
          <div className='h-20 flex items-center justify-center bg-white'>
            <div className='flex grow gap-3 mx-4 px-8 h-12 items-center rounded-full bg-mybackground'>
              <button className='bg-transparent p-0 border-none' onClick={logout}>
                <Smile strokeWidth={1.25} size={22} className='text-gray-400 hover:text-gray-500' />
              </button>
              <input className='grow bg-mybackground outline-none text-gray-500 text-sm' placeholder='Type a message' onChange={(e) => setTypedMessage(e.target.value)} value={typedMessage} />
              <button className='bg-transparent p-0 border-none' onClick={logout}>
                <Image strokeWidth={1.25} size={22} className='text-gray-400 hover:text-gray-500' />
              </button>
              <button className='bg-transparent p-0 border-none' onClick={sendMessagetoServer}>
                <Send strokeWidth={1.25} size={22} className='text-gray-400 hover:text-gray-500' />
              </button>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}
