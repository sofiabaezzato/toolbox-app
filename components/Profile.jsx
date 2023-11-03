import ToolCard from './ToolCard'
import Image from 'next/image'
import React from 'react'
import InfoCard from './InfoCard'

const Profile = ({ name, desc, data, handleEdit, handleDelete, handleSettings, session, userDetails }) => {
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