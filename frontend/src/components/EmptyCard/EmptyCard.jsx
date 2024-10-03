import React from 'react'

const EmptyCard = ({ imgSrc, message }) => {
    return (
        <div className='flex flex-col items-center justify-center mt-32 bg-white dark:bg-gray-800 p-4 rounded-lg'>
  <img src={imgSrc} alt="Empty Card" className="w-60 h-44" />

  <p className='w-1/2 text-sm font-medium text-slate-700 dark:text-slate-300 text-center leading-7 mt-8'>
    {message}
  </p>
</div>

    )
}

export default EmptyCard