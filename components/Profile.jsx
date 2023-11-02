import ToolCard from './ToolCard'

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
          className="mt-5 px-5 py-1.5 text-xs bg-red-600 rounded-full text-white font-semibold"
        >
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