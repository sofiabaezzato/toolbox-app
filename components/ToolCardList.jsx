"use client"

import ToolCard from './ToolCard'

const ToolCardList = ({ data, updatePosts, handleTagClick }) => {
  return (
    <div className="mt-10 tool_layout">
      {data
      .sort((a, b) => a.toolName.toLowerCase() > b.toolName.toLowerCase() ? 1 : -1)
      .map((post) => (
        <ToolCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          updatePosts={updatePosts}
        />
      ))}
    </div>
  )
}

export default ToolCardList