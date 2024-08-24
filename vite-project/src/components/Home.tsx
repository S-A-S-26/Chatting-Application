import React, { useEffect , lazy } from "react";
import { useNavigate } from "react-router-dom";
const ContactList = lazy(()=> import("./ContactList"));
const Message = lazy(()=>import("./Message"));

export default function Home() {
  const Navigate = useNavigate();

  useEffect(() => {
    console.log("use effect home");
    const token = localStorage.getItem("token")
    if (!token){
      Navigate("/register");
      return;
    }
    async function checkAuth() {
      let res =await fetch(import.meta.env.VITE_BASE_URL + "/checkauth", {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      });
      let data = await res.json();
      if (!data.msg) {
        Navigate("/register");
      }
    }
    checkAuth();
  }, []);

  return (
    <>
      <div className="flex grow">
        <div className="w-full md:w-6/12 xl:w-4/12 2xl-3/12">
          <ContactList />
        </div>
        <div className="hidden border md:w-6/12 md:block xl:w-8/12 2xl-9/12">
          <Message />
        </div>
      </div>
    </>
  );
}
