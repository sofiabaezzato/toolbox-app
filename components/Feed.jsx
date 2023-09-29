"use client"

import { useEffect, useState } from 'react'

import ToolCard from './ToolCard'

const ToolCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-10 tool_layout">
      {data.map((post) => (
        <ToolCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])

  const handleSearchChange = (e) => {

  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/tool')
      const data = await response.json()

      setPosts(data)
    }

    fetchPosts()
  }, [])

  return (
    <section className='feed'>
      <form className="relative w-full flex-center">
        <input
        type="text"
        placeholder='Search for a tag, a tool name or a username'
        value={searchText}
        onChange={handleSearchChange}
        required
        className='search_input peer'
        
        />
      </form>

      <ToolCardList
        data={posts}
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed