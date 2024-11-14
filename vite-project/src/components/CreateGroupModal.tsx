import { IRootState } from "@/store"
import { X } from "lucide-react"
import { useSelector } from "react-redux"

export default function CreateGroupModal() {
    const groupModal = useSelector((state: IRootState) => state.groupModal)
    return (groupModal && <>
        <div className="flex flex-col fixed w-[350px] h-[500px] rounded-lg overflow-hidden m-auto inset-0 inset-shadow bg-white">
            <div className="border">
                <div className="relative flex items-center justify-center p-6 text-xl text-mysecondary">
                    <button className="bg-transparent absolute left-0 top-0" >
                        <X />
                    </button>
                    New Group
                </div>
            </div>
            <div>
                <div>Content</div>
            </div>
        </div>
    </>)
}
