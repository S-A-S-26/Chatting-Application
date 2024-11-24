import { IRootState } from "@/store"
import { ArrowRight, CircleUserRound, X } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { toggleCreateGroup } from "../store/utils/groupModal";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox"

export default function CreateGroupModal() {
    const groupModal = useSelector((state: IRootState) => state.groupModal)
    const dispatch = useDispatch()
    const sliceData = useSelector((state: IRootState) => state.user)
    const [userList, setUserList] = useState<[]>([])
    const [participants, setParticipants] = useState<string[]>([])
    const [screen, setScreen] = useState<number>(0)

    useEffect(() => { if (groupModal) fetchActiveContacts() }, [groupModal])

    async function fetchActiveContacts() {
        let res = await fetch(import.meta.env.VITE_BASE_URL + "/userchatprofiles?user=" + sliceData._id)
        let data = await res.json()
        data = data.filter((val) => !val.group)
        setUserList(data)
        console.log("active contacts", data)
    }

    const handleCheckboxChange = (checked: boolean, value: string) => {
        if (checked && !participants.includes(value)) {
            // setCheckedItems(prev => [...prev, "terms1"])
            setParticipants((prev) => [...prev, value])
            console.log("checked", checked)
        } else {
            // setCheckedItems(prev => prev.filter(item => item !== "terms1"))
            setParticipants((prev) => prev.filter((val) => val != value))
        }
    }

    useEffect(() => console.log(participants), [participants])

    return (groupModal && <>
        <div onClick={() => dispatch(toggleCreateGroup())} className="fixed top-0 bottom-0 right-0 left-0 z-30 bg-mask"></div>
        <div className="z-50 flex flex-col fixed w-[400px] h-[540px] rounded-lg overflow-hidden m-auto inset-0 inset-shadow bg-white">
            <div className="border-b h-[80px]">
                <div className="relative flex items-center justify-center p-6 text-2xl text-mysecondary">
                    <button onClick={() => dispatch(toggleCreateGroup())} className="bg-transparent absolute left-0 top-0 hover:outline-none hover:border-none m-6" >
                        <X />
                    </button>
                    New Group
                </div>
            </div>
            <div >
                <div>
                    <div className="mx-6 grid justify-center overflow-scroll h-[350px] pt-4">
                        {userList.map((val, idx) => (
                            <div key={idx} className="w-[250px] grid justify-center items-center grid-cols-[1fr_2fr_1fr] my-4">
                                <div className="grid justify-center items-center">
                                    <div className=' h-[52px] w-[52px] rounded-full border-green-400 border-hidden relative mr-4'>
                                        {val.profile ?
                                            <div className='h-[50px] w-[50px] rounded-full overflow-hidden'>
                                                <img className='object-cover w-full h-full' src={import.meta.env.VITE_STATIC + val.profile} />
                                            </div>
                                            :
                                            <div className='bg-gray-50 rounded-full p-0 m-0'>
                                                <CircleUserRound strokeWidth={0.75} size={60} className='h-full w-full text-gray-300' />
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="grid justify-start text-left h-fit">

                                    <div className="text-xl text-gray-700 leading-3">{val.phone}</div>
                                    <div className="text-gray-500">{val.username}</div>
                                </div>
                                <div className="grid justify-center items-center">
                                    <div className="items-top flex space-x-2 mb-[12px]">
                                        <Checkbox id={val._id} onCheckedChange={(checked: boolean) => handleCheckboxChange(checked, val._id)} />
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
                <button className="grid justify-end w-full" onClick={nextScreen}>
                    <ArrowRight className="text-mysecondary mx-8 my-4" size={35} />
                </button >
            </div>
        </div >
    </>)
}
