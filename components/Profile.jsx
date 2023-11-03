import ToolCard from './ToolCard'
import Image from 'next/image'
import React from 'react'

const Profile = ({ name, desc, data, handleEdit, handleDelete, handleSettings, session }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="red_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      {session?.user.id && (
        <button
          onClick={handleSettings}
          className="flex items-center gap-1 mt-5 px-1.5 py-1.5 text-xs text-gray-800 font-semibold"
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

      <div className="mt-10 tool_layout">
        {data
        .sort((a, b) => a.toolName.toLowerCase() > b.toolName.toLowerCase() ? 1 : -1)
        .map((post) => (
          <ToolCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  )
}

export default Profile