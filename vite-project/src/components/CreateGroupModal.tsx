import { IRootState } from "@/store"
import { ArrowRight, CircleUserRound, ImageUp, X } from "lucide-react"
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

    useEffect(() => {
        if (groupModal) fetchActiveContacts()

        setScreen(0)
    }, [groupModal])

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

    function nextScreen() {

    }

    useEffect(() => console.log(participants), [participants])

    return (groupModal && <>
        <div onClick={() => dispatch(toggleCreateGroup())} className="fixed top-0 bottom-0 right-0 left-0 z-30 bg-mask"></div>
        <div className="z-50 flex flex-col fixed w-[400px] h-[540px] rounded-lg overflow-hidden m-auto inset-0 inset-shadow bg-white">
            <div className="border-b h-[80px]">
                <div className="relative flex items-center justify-center p-6 text-2xl text-mysecondary">
                    <button onClick={() => dispatch(toggleCreateGroup())} className="bg-transparent p-0 absolute left-0 top-0 hover:outline-none hover:border-none m-6" >
                        <X />
                    </button>
                    New Group
                </div>
            </div>
            <div >
                <div>
                    {screen == 0 ?
                        <div className="mx-1 grid justify-center overflow-scroll h-[450px] pt-4">
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
                        :
                        <div className=" flex overflow-scroll h-[410px] pt-4 my-4 flex-col mx-6 py-10">
                            <div className="flex gap-14 flex-col grow px-5">
                                <div className="relative">
                                    <div className="relative">
                                        <input
                                            placeholder="name"
                                            className="w-full rounded-md border border-input bg-background px-5 py-4 text-lg ring-offset-background placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                        <div className="absolute left-3 -top-2.5 px-1 bg-background text-left">
                                            <span className="text-lg text-muted-foreground ">Group Label</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="upimg" className="flex justify-center items-center border-dashed border-2 h-16 hover:border-mysecondary hover:text-gray-600 rounded-md"><ImageUp />Group Profile</label>
                                    <input type="file" id="upimg" hidden />
                                </div>
                            </div>
                            <div>
                                <button className='text-white tracking-wide mt-6 button-padding bg-gradient-to-r from-sky-500 to-indigo-500 hover:border-blue-900'>
                                    Create
                                </button>
                            </div>
                        </div>
                    }
                </div>
                {screen == 0 &&
                    <button className="grid justify-end w-full absolute bottom-0" onClick={() => setScreen((prev) => prev + 1)}>
                        <ArrowRight className="text-mysecondary mx-8 my-4" size={35} />
                    </button >
                }
            </div>
        </div >
    </>)
}
