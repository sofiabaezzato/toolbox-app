import ToolCard from './ToolCard'
import React from 'react'
import InfoCard from './InfoCard'
import Loading from './Loading'


const Profile = ({ name, desc, data, isLoading, handleDelete, handleSettings, session, postType, setPostType, userDetails, setIsModalOpen, postDeleted }) => {

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
      
      {session?.user.id && postType === 'favorites' && data.length === 0 && (
        <p
          className='text-left pl-5 mt-10 text-gray-700 text-sm'
        >Nothing to show here yet! Start starring your favorite tools.</p>
      )}

      {isLoading ? <Loading /> : (
        <div className="tool_layout">
          {data.length > 0 && data
          .sort((a, b) => a.toolName.toLowerCase() > b.toolName.toLowerCase() ? 1 : -1)
          .map((post) => (
            <ToolCard
              key={post._id}
              post={post}
              handleDelete={() => handleDelete(post)}
              postType={postType}
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