import { CircleUserRound, Info, MessageCircleMore, User } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { TProfile } from '../Interfaces/Interface';

export default function ProfileEdit({userData}:{userData:TProfile}) {
  const [imageKey, setImageKey] = useState(Date.now());

  async function changePhoto(event: React.ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files[0]
    if (!file) return;
    console.log("changePhoto",file)
    const formData = new FormData();
    formData.append('_id',userData._id)
    formData.append('filename',file.name)
    formData.append('photo',file)
    let res = await fetch(import.meta.env.VITE_BASE_URL + '/profileupdate',{
        method: 'POST',
        body: formData,
      });

    let data = await res.json()
    console.log("data",data)
    if (data && res.status === 200) {
        console.log('Photo updated successfully')
        toast.success('Photo updated successfully')
        setImageKey(Date.now())
    } else {
        console.error('Failed to update photo')
        toast.error('Failed to update photo')
    }
  }

  return (
    <>
        <div className='h-full flex flex-col'>
            <div className='flex justify-between px-4 md:px-7 border h-24 md:h-28 border-r-0 items-center'>
                <h2 className='text-gray-700 text-3xl font-normal tracking-tighter flex items-center'>
                    <span>Profile</span>
                </h2>
            </div>
            <div className='overflow-scroll max-h-[calc(100vh-7rem)] bg-background grow grid grid-rows-[3fr_1fr_1fr] text-left'>
                <div className='m-1 bg-white rounded-xl grid place-items-center'>
                    <label className="transition-all duration-1000 rounded-full overflow-hidden h-[250px] w-[250px] border-none bg-transparent relative hover:after:content-['Change\0020Picture'] after:absolute hover:after:text-gray-700 after:-inset-1 hover:after:bg-gray-200 hover:after:opacity-40 after:grid after:items-center after:underline bg-transparent text-center">
                        <input hidden type='file' accept='image' onChange={changePhoto} />
                    {
                    userData.profile?
                    <img className='object-cover w-full h-full' src={`${import.meta.env.VITE_STATIC}${userData.profile}?${imageKey}`} />
                    :
                    <CircleUserRound strokeWidth={0.2} size={250}  className='text-gray-300'/>
                    }
                        
                    </label>
                </div>
                <div className='m-1 bg-white rounded-xl p-4 px-8'>
                    <div className='flex items-center gap-3'>
                        <User strokeWidth={1.5} size={30} className='text-gray-400'/>
                        <div className='w-full'>
                            <h2 className='text-md tracking-tight text-gray-700'>Username</h2>

                            <div className='border-b-[1px] flex gap-4  border-gray-300 '>
                                <input className='w-full outline-none bg-transparent text-gray-500' type="text" placeholder='' name='phone' value={userData.username}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='m-1 bg-white rounded-xl p-4 px-8'>
                    <div className='flex items-center gap-3'>
                        <Info strokeWidth={1.5} size={30} className='text-gray-400'/>
                        <div className='w-full'>
                            <h2 className='text-md tracking-tight text-gray-700'>Status</h2>

                            <div className='border-b-[1px] flex gap-4  border-gray-300 '>
                                <input className='w-full outline-none bg-transparent text-gray-500' type="text" placeholder='' name='status' value={userData.status}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
