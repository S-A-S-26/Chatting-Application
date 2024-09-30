import { LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"
export default function() {
    const Navigate = useNavigate()
    function logout() {
        localStorage.removeItem('token')
        Navigate('/register')
    }
    return (
        <>
            <div>
                footer
                <div className=' flex p-2 rounded-full transition-all duration-500 group hover:bg-gray-100 justify-between items-center'>
                    <button className='bg-transparent p-0 border-none outline-none hover:border-none' onClick={logout}>
                        <LogOut strokeWidth={1.3} size={22} className='text-gray-400 transition-all duration-500 group-hover:text-gray-600' />
                    </button>
                </div>
            </div >
        </>
    )
}
