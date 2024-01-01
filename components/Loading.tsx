import React from 'react'

const Loading = () => {
  return (
    <div className='pt-28 flex flex-col gap-4 justify-center items-center'>
      <p className='desc'>
        Loading Tools...
      </p>
      <div className='h-5 w-5 animate-spin rounded-full border-b-2 border-gray-700'></div>
    </div>
  )
}

export default Loading