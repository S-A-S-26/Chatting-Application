import { useSelector } from 'react-redux'
import { TChatData } from '../Interfaces/Interface'
import { IRootState } from '@/store'

export default function Messages({ chats }: { chats: TChatData }) {
    const loggedUser = useSelector((state: IRootState) => state.user)
    return (
        <>
            <div className='h-full py-8'>
                {chats && chats.messages.map((val: { content: string, sender: string }, idx: number) => {
                    console.log("idx", idx)
                    return (
                        <div key={idx} className={`flex my-4 mx-4 ${loggedUser._id == val.sender ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-40 p-3  rounded-xl ${loggedUser._id == val.sender ? 'bg-mysecondary text-white rounded-tr-none' : 'rounded-tl-none bg-white'}`} >
                                {val.content}
                            </div>
                        </div>
                    )

                })}
            </div >
        </>
    )
}
