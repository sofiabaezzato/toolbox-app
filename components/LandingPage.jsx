'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { signIn, getProviders } from 'next-auth/react'

const LandingPage = () => {
  const [providers, setProviders ] = useState(null)

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }

    setUpProviders()
  }, [])

  return (
    <section
      className='feed mb-28'
    >
      {providers && 
        Object.values(providers).map((provider) => (
          <button
              type="button"
              key={provider.name}
              onClick={() => signIn(provider.id, { callbackUrl: 'https://toolbox-app-delta.vercel.app/'})}
              className="black_btn_big"
          >
            Get Started
          </button>
        ))
    }
      <div className="flex flex-col justify-center items-center mt-4 py-20 max-w-3xl">
        <Image
          src='/images/screen-home.png'
          alt='toolbox home screenshot'
          height={397}
          width={706}
          className='rounded-md shadow-xl'
        />
        <div className=' flex flex-col sm:flex-row gap-36 sm:gap-16 mt-36 items-center justify-center'>
         <div className="relative">
           <Image
              src='/images/toolcard-2.png'
              alt='toolbox card screenshot'
              height={209}
              width={340}
              className='rounded-lg shadow-lg blur-[1px] '
            />
            <Image
              src='/images/toolcard-1.png'
              alt='toolbox card screenshot'
              height={209}
              width={340}
              className='absolute top-20 -left-20 rounded-lg shadow-lg overflow-x-clip'
            />
         </div>
          <p className="desc sm:w-1/2">
            <span className='red_gradient'>Customize</span> your arsenal and ⭐ <span className='red_gradient'>bookmark</span> your top picks from your friends' toolkits. Craft your perfect toolbox with a touch of collaborative flair!</p>
        </div>

        <div className='mt-28'>

        </div>

      </div>
      
    
    </section>
  )
}

export default LandingPage