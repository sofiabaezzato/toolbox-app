import ToolCard from './ToolCard'
import React from 'react'
import InfoCard from './InfoCard'
import Loading from './Loading'
import { Session } from 'next-auth'
import { Post, User } from '@utils/types'

type ProfileProps = {
  name: string
  desc: string
  data: Post[]
  userDetails: User
  isLoading?: boolean
  handleSettings?: () => void
  session?: Session
  postType?: string
  setPostType?: React.Dispatch<React.SetStateAction<string>>
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>
  postDeleted?: React.MutableRefObject<Post>
}

const Profile = ({
  name,
  desc,
  data,
  userDetails,
  isLoading,
  handleSettings,
  session,
  postType,
  setPostType,
  setIsModalOpen,
  postDeleted
} : ProfileProps ) => {

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="red_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <InfoCard
        userDetails={userDetails}
        session={session}
        handleSettings={handleSettings}
      />

      {session?.user.id && (
        <div className="mt-10 pl-5 flex gap-4">
          <button
            onClick={() => setPostType('yourTools')}
            className={postType === 'yourTools' ? 'text-red-600 font-semibold border-b-2 border-red-600' : 'text-gray-700 hover:text-gray-500'}
          >
            {data.length > 1 ? 'Your Tools' : 'Your tool'}
          </button>
          <button
            onClick={() => setPostType('favorites')}
            className={postType === 'favorites' ? 'text-red-600 font-semibold border-b-2 border-red-600' : 'text-gray-700 hover:text-gray-500'}
          >
            Favorites
          </button>
        </div>
      )}
      
      {/* If user has no favorite tools yet, display a message */}
      {session?.user.id && postType === 'favorites' && data.length === 0 && (
        <p
          className='text-left pl-5 mt-10 text-gray-700 text-sm'
        >Nothing to show here yet! Start starring your favorite tools.</p>
      )}

      {/* If tools are loading display a loading message */}
      {isLoading ? <Loading />
      : (
        /* Else display tool cards */
        <div className="tool_layout">
          {data.length > 0 && data
          .sort((a, b) => a.toolName.toLowerCase() > b.toolName.toLowerCase() ? 1 : -1)
          .map((post) => (
            <ToolCard
              key={post._id.toString()}
              post={post}
              setIsModalOpen={setIsModalOpen}
              postDeleted={postDeleted}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default Profile