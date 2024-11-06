import React, { useEffect, lazy, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TProfile } from "../Interfaces/Interface";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/utils/utils";
import { io } from "socket.io-client";
import { Socket } from "socket.io-client";
import MobileFooter from "./MobileFooter";
import OtherUserDetail from "./OtherUserDetail";
import MessageContainer from "./MessageContainer";

const ContactList = lazy(() => import("./ContactList"));
const Message = lazy(() => import("./Message"));

export default function Home() {
  const Navigate = useNavigate();
  const [userData, setUserData] = useState<TProfile>({
    _id: '',
    username: '',
    phone: '',
    status: '',
    profile: '',
    pinned: [],
  });

  const [showProfile, setProfileStatus] = useState<boolean>(false)
  const [activeChatls, setActiveChatls] = useState<TProfile[]>([])
  const [onlineUsersList, setOnlineUsers] = useState<object | null>(null)
  const otherProfile = useRef<HTMLDivElement | null>(null)
  const dispatch = useDispatch()
  const [socket, setSocket] = useState<Socket>()
  async function checkAuth() {
    const token = localStorage.getItem("token")
    if (!token) {
      Navigate("/register");
      return;
    }
    let res = await fetch(import.meta.env.VITE_BASE_URL + "/checkauth", {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });
    let data = await res.json();
    console.log("checkAuth", data);
    if (!data.user) {
      Navigate("/register");
    } else {
      setUserData({
        _id: data.user._id,
        username: data.user.username,
        phone: data.user.phone,
        status: data.user.status,
        profile: data.user.profile,
        pinned: data.user.pinned,
      })
      dispatch(setUser({
        _id: data.user._id,
        username: data.user.username,
        phone: data.user.phone,
        status: data.user.status,
        profile: data.user.profile,
        pinned: data.user.pinned
      }));
    }
  }

  //component did mount use effect
  useEffect(() => {
    console.log("use effect home");
    async function process() {
      await checkAuth();
      setSocket(io(import.meta.env.VITE_BASE))
    }
    process()

    return function() {
      console.log("why is home cleanup function triggered")
      if (!socket) return
      socket.emit("remove_user",
        userData._id
      )
      socket.disconnect()
    }
  }, []);

  useEffect(() => {
    if (!socket) return
    console.log("socket useEffect", socket)
    socket.on("welcome", (msg: string) => {
      console.log("socket msg", msg)
    })

    socket.on('connect', () => {
      console.log("data socket.on connect", socket.id)
      socket.emit("log_user", {
        [userData._id]: socket.id,
      })
    })
  }, [socket])

  function toggleOtherProfile() {
    console.log("otherProfile", otherProfile.current.style.right)
    if (!otherProfile.current) return
    if (otherProfile.current.style.right == '' || otherProfile.current.style.right == '-800px') {
      otherProfile.current.style.right = '0'
    } else {
      otherProfile.current.style.right = '-800px'
    }
  }


  return (
    <>
      {/* <button onClick={disconn}>disconn</button> */}
      <div className="flex grow relative">
        <div className="w-full md:w-6/12 xl:w-4/12 2xl-3/12">
          <ContactList {...{ showProfile, userData, socket, activeChatls, setActiveChatls, onlineUsersList, setOnlineUsers }} />
        </div>
        <div className="hidden border md:w-6/12 md:block xl:w-8/12 2xl-9/12">
          {/* <Message {...{ toggleOtherProfile, showProfile, setProfileStatus, socket, activeChatls, setActiveChatls, onlineUsersList }} /> */}
          <MessageContainer {...{ toggleOtherProfile, showProfile, setProfileStatus, socket, activeChatls, setActiveChatls, onlineUsersList }} />
        </div>
        <div className="md:hidden bottom-0 left-0 right-0 h-20 fixed border-secondary border-t-2">
          <MobileFooter />
        </div>
        <div ref={otherProfile} className="z-50 absolute w-full md:w-5/12 xl:w-3/12 2xl-3/12 h-full border-l-[1px] transition-all duration-500 right-[-800px]"><OtherUserDetail {...{ toggleOtherProfile }} /></div>
      </div>
    </>
  );
}
