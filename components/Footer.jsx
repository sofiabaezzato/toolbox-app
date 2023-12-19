import React from 'react'

const Footer = () => {
  return (
    <footer className='mt-28 p-4 text-center border-t border-gray-700/10 w-screen'>
      <small className='mb-2 text-xs'>
        &copy; {new Date().getFullYear()} ToolBox - founded with ❤️ by Sofia Baezzato
      </small>
      {/* <p className='text-xs'>
        <span className='font-semibold'>About this website:</span> built with React (Next.js), Typescript, Framer Motion and Resend. Hosted in Vercel.
      </p> */}
    </footer>
  )
}

export default Footer