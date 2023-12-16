'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { signIn, getProviders } from 'next-auth/react'

const LandingPage = () => {
  const [providers, setProviders ] = useState(null)
  const [viewImage, setViewImage] = useState('grid')

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
        <div className='flex flex-col sm:flex-row gap-36 sm:gap-16 mt-36 items-center justify-center'>
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
              className='absolute top-12 -left-5 rounded-lg shadow-lg'
            />
         </div>
          <p className="desc sm:w-1/2">
            <span className='red_gradient font-bold'>Customize</span> your arsenal and ⭐ <span className='red_gradient font-bold'>bookmark</span> your top picks from your friends' toolkits. Craft your perfect toolbox with a touch of collaborative flair!</p>
        </div>

        <div className='mt-28 sm:mt-36 mb-28 flex flex-col gap-8 items-center justify-center'>
          <p className="red_gradient head_text text-center sm:text-2xl">What's your favorite view?</p>
          <div className="flex gap-3 justify-center items-center">
            <button onClick={() => setViewImage('list')} className={viewImage === 'list' ? 'red_btn' : 'red_active_btn'}>List</button>
            <button onClick={() => setViewImage('grid')} className={viewImage === 'grid' ? 'red_btn' : 'red_active_btn'}>Grid</button>
          </div>
          <p className="text-lg text-gray-600 sm:text-xl max-w-2xl">We've got you covered!</p>
          <Image
            src={`/images/${viewImage}view.png`}
            alt='toolbox feed screenshot'
            height={397}
            width={706}
            className='rounded-md shadow-xl'
        />
        </div>

        <p className="red_gradient head_text text-center sm:text-2xl sm:max-w-sm">
           Start building your personal ToolBox now!
        </p>
        {providers && 
          Object.values(providers).map((provider) => (
            <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id, { callbackUrl: 'https://toolbox-app-delta.vercel.app/'})}
                className="black_btn_big mt-8"
            >
              Add your first tool
            </button>
          ))
        }
      </div>
    </section>
  )
}

export default LandingPage