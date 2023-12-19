'use client'

import React, { useEffect } from 'react'

const ConfirmationModal = ({ isModalOpen, handleModalClose, handleDelete}) => {
  console.log('modal opened')
  // close modal on esc key press
  useEffect(() => {
    const closeOnEscapeKey = (e) => {
      e.key === 'Escape' ? handleModalClose() : null;
    }
    
    document.body.addEventListener('keydown', closeOnEscapeKey)
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey)
    }
  }, [handleModalClose])

  // disable scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  if (!isModalOpen) return null

  return (
    <div
      className='z-50 fixed top-0 left-0 w-screen h-screen bg-gray-700/50'
    >ConfirmationModal
      <div className="flex gap-3">
        <button onClick={handleModalClose}>
          close
        </button>
        <button onClick={handleDelete}>
          delete
        </button>
      </div>
    </div>
  )
}

export default ConfirmationModal