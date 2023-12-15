"use client"

import ToolCard from './ToolCard'
import ToolCardRow from './ToolCardRow'
import { useState } from 'react'

const ToolCardList = ({ data, handleTagClick, view }) => {
  const [isOpen, setIsOpen] = useState(null)

  return (
    <div className={view === 'grid' ? "tool_layout" : "tool_list_layout"}>
      {data
      .sort((a, b) => a.toolName.toLowerCase() > b.toolName.toLowerCase() ? 1 : -1)
      .map((post) => (
        view === 'grid' ? 
        <ToolCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
        : 
        <ToolCardRow
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        
      ))}
    </div>
  )
}

export default ToolCardList