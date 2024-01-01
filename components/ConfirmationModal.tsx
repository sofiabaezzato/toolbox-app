'use client'

import React, { useEffect } from 'react'

type ConfirmationModalProps = {
  isModalOpen: boolean
  handleModalClose: React.Dispatch<React.SetStateAction<boolean>>
  handleDelete: () => Promise<void>
}

const ConfirmationModal = ({ isModalOpen, handleModalClose, handleDelete} : ConfirmationModalProps) => {
  // close modal on esc key press
  useEffect(() => {
    const closeOnEscapeKey = (e) => {
      e.key === 'Escape' ? handleModalClose(false) : null;
    }
    
    document.body.addEventListener('keydown', closeOnEscapeKey)
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey)
    }
  }, [handleModalClose])

  // disable scroll when modal is open
  useEffect(() => {
    document.body.style.overflowY = 'hidden'
    return () => {
      document.body.style.overflowY = 'unset'
    }
  }, [isModalOpen])

  if (!isModalOpen) return null

  return (
    <div
      className='z-50 fixed flex top-0 left-0 w-screen h-screen bg-gray-700/50'
    >
      <div className="flex flex-col py-10 px-24 gap-3 bg-white rounded-lg m-auto items-center">
        <p
          className='text-lg text-gray-600 sm:text-xl max-w-2xl'
        >Delete this tool?</p>

        <div className="flex gap-5 text-gray-600 mt-4 justify-between hover:text-gray-400">
          <button 
            className='red_active_btn hover:border-red-400 hover:text-red-400'
            onClick={() => handleModalClose(false)}
            aria-label='Go back'
          >
            Back
          </button>
          <button
            onClick={handleDelete}
            className='red_btn hover:bg-transparent hover:text-red-600'
            aria-label='delete tool'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal