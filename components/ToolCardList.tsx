"use client"

import { Post } from '@utils/types'
import ToolCard from './ToolCard'
import ToolCardRow from './ToolCardRow'
import { useState } from 'react'

type ToolCardListProps = {
  data: [] | Post[]
  handleTagClick: (tagName: any) => void
  view: "list" | "grid"
}

const ToolCardList = ({ data, handleTagClick, view } : ToolCardListProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={view === 'grid' ? "tool_layout" : "tool_list_layout"}>
      {data
      .sort((a : Post, b : Post) => a.toolName.toLowerCase() > b.toolName.toLowerCase() ? 1 : -1)
      .map((post) => (
        view === 'grid' ? 
        <ToolCard
          key={post._id.toString()}
          post={post}
          handleTagClick={handleTagClick}
        />
        : 
        <ToolCardRow
          key={post._id.toString()}
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