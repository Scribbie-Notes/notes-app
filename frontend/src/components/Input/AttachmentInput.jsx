import React from 'react'
import { MdAdd, MdClose } from 'react-icons/md'

const AttachmentInput = () => {
    return (
        <div className='flex items-center gap-4'>
         <input type="file" className='p-2 border rounded-md text-sm'/>
         <button className='w-9 h-9 flex items-center transition-all rounded-xl border items-center text-white bg-gray-800 hover:bg-gray-900'>
                    <MdAdd
                        className='text-xl text-white-700 hover:text-white ml-[8px]'
                    />
                </button>
        </div>
    )
}

export default AttachmentInput
