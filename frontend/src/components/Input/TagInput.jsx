import React, { useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'

const TagInput = ({ tags, setTags }) => {

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const addNewTag = () => {
        if (inputValue.trim() !== "") {
            setTags([...tags, inputValue.trim()]);
            setInputValue("");
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            addNewTag();
        }
    }

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div>

            {tags?.length > 0 && (
                <div className='flex items-center gap-2 flex-wrap mt- mb-2'>
                    {tags.map((tag, index) => (
                        <span key={index} className='flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded'>
                            # {tag}
                            <button onClick={() => { handleRemoveTag(tag) }}>
                                <MdClose />
                            </button>
                        </span>
                    ))}
                </div>
            )}

            <div className='flex items-center gap-4'>
                <input
                    type="text"
                    value={inputValue}
                    className='p-2 border rounded-md text-xs'
                    placeholder='Add Tags'
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />

                <button className='w-9 h-9 flex items-center transition-all rounded-xl border  text-white bg-gray-800 hover:bg-gray-900' 
                     onClick={() => {
                        addNewTag();
                    }}
                >
                    <MdAdd className='text-xl text-white-700 hover:text-white ml-[8px]'/>
                </button>
            </div>
        </div>
    )
}

export default TagInput