import { Search } from 'lucide-react'
import React, { useRef, useState } from 'react'

export default function ExpandableSearch({searchPhone,setShowSearch,setContactList}:{searchPhone:(value:string)=>void,setShowSearch:(value:boolean)=>void,setContactList:(value:[])=>void}) {
  const [expandSearch,setExpand] = useState<boolean>(false)
  const inputSearch = useRef<HTMLDivElement>(null)
  const inputElm = useRef<HTMLInputElement>(null)
  const [searchText,setSearchText] = useState('')
  let skip = false

  function openSearch(){
    expandSearch?setExpand(false):setExpand(true)
    console.log("openSearch",inputSearch)
    if (inputSearch.current) {
        if(expandSearch){
          setShowSearch(false)
          setContactList([])
          if (inputElm.current) {
            inputElm.current.value = '';
          }
          inputSearch.current.style.width = '0px'
        }else{
          setShowSearch(true)
          inputSearch.current.style.width = '200px'
        }
    }
  }

  function startSearch(e:React.ChangeEvent<HTMLInputElement>){
    // setSearchText(e.target.value)
    if (!skip){
        skip = true
        setTimeout(() => {
            console.log("logging",e.target.value)
            searchPhone(e.target.value)
            skip = false
        },1000)
    }
  }

  return (
    <>
     <div className={`relative border-green-400 flex items-center rounded-full justify-between bg-gray-50`}>
        <div className={`transition-all duration-500 w-0 rounded-full overflow-hidden`} ref={inputSearch}>
            <input ref={inputElm} type='text' placeholder='Search' className='w-full px-6 py-2 text-sm text-gray-500 border-0 focus:outline-none bg-gray-50 underline rounded-full' onChange={(e)=>startSearch(e)}/>
        </div>
        <div className='relative right-0'>
            <button className='bg-gray-50 flex p-2 rounded-full transition-all duration-500 group hover:bg-gray-100 hover:border-none border-none' onClick={openSearch}>
                <Search strokeWidth={1.3}className='text-gray-400 transition-all duration-500 group-hover:text-gray-600'/> 
            </button>
        </div>
     </div>
    </>
  )
}
