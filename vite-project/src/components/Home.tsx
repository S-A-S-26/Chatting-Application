import React, { useEffect , lazy, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TProfile } from "../Interfaces/Interface";
import { useDispatch,useSelector } from "react-redux";
import { setUser } from "../store/utils/utils";
const ContactList = lazy(()=> import("./ContactList"));
const Message = lazy(()=>import("./Message"));

export default function Home() {
  const Navigate = useNavigate();
  const [userData,setUserData] = useState<TProfile>({
    _id: '',
    username: '',
    phone: '',
    status:'',
    profile:'',
    pinned: [],
  });
  
  const [showProfile,setProfileStatus] = useState<boolean>(false)
  const dispatch = useDispatch()

  async function checkAuth() {
    const token = localStorage.getItem("token")
    if (!token){
      Navigate("/register");
      return;
    }
    let res =await fetch(import.meta.env.VITE_BASE_URL + "/checkauth", {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });
    let data = await res.json();
    console.log("checkAuth", data);
    if (!data.user) {
      Navigate("/register");
    }else{
      setUserData({
        _id: data.user._id,
        username: data.user.username,
        phone: data.user.phone,
        status:data.user.status,
        profile:data.user.profile,
        pinned: data.user.pinned,
      })
      dispatch(setUser({
        _id: data.user._id,
        username: data.user.username,
        phone: data.user.phone,
        status:data.user.status,
        profile:data.user.profile,
        pinned:data.user.pinned
      }));
    }
  }

  useEffect(() => {
    console.log("use effect home");
    
    checkAuth();
  }, []);

  return (
    <>
      <div className="flex grow">
        <div className="w-full md:w-6/12 xl:w-4/12 2xl-3/12">
          <ContactList {...{showProfile,userData}}/>
        </div>
        <div className="hidden border md:w-6/12 md:block xl:w-8/12 2xl-9/12">
          <Message {...{showProfile,setProfileStatus}}/>
        </div>
      </div>
    </>
  );
}
