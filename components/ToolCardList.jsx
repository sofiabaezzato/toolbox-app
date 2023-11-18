"use client"

import ToolCard from './ToolCard'

const ToolCardList = ({ data, setPosts, handleTagClick }) => {
  return (
    <div className="mt-10 tool_layout">
      {data
      .sort((a, b) => a.toolName.toLowerCase() > b.toolName.toLowerCase() ? 1 : -1)
      .map((post) => (
        <ToolCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          setPosts={setPosts}
        />
      ))}
    </div>
  )
}

export default ToolCardList