import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const InfoCard = ({ userDetails, session, handleSettings }) => {
  return (
    <section className='my-5 p-5 max-w-lg border-b-2 flex flex-col gap-5'>
      {userDetails?.city && (
        <div className='flex gap-2 items-center'>
          <Image
            src="/icons/location.svg"
            width={12}
            height={12}
            alt="location icon"
            className='w-[12px] h-[12px]'
          />
          <p className="font-satoshi text-sm text-gray-700 max-w-full font-semibold">
          {userDetails.city}
          </p>
        </div>
      )}

      {userDetails?.bio && (
        <p className="font-satoshi text-sm text-gray-700">{userDetails.bio}</p>
      )}
      
      {userDetails?.website && (
        <Link className="px-5 py-1.5 text-xs border border-gray-700 rounded-full text-gray-700 font-semibold flex flex-center gap-2 max-w-[120px]"
          href={userDetails.website}
          target='_blank'
        >
          Website
          <Image
            src="/icons/link.svg"
            width={12}
            height={12}
            alt="link icon"
          />
        </Link>
      )}

      {session?.user.id && (
        <button
          onClick={handleSettings}
          className="flex items-center gap-2 px-1.5 py-1.5 text-xs text-gray-700 font-medium justify-end "
        >
          <Image
              src="/icons/edit.svg"
              width={12}
              height={12}
              alt="link icon"
            />
          Edit profile
        </button>
      )}
    </section>
  )
}

export default InfoCard