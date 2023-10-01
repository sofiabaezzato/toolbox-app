"use client"

import { useEffect, useState } from 'react'

import ToolCard from './ToolCard'

const ToolCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-10 tool_layout">
      {data
      .sort((a, b) => a.toolName > b.toolName ? 1 : -1)
      .map((post) => (
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
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchResults, setSearchResults] = useState([])

  const [posts, setPosts] = useState([])

  const fetchPosts = async () => {
    const response = await fetch('/api/tool')
    const data = await response.json()

    setPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const filterTools = (searchText) => {
    const regex = new RegExp(searchText, "i")

    return posts.filter((item) =>
      regex.test(item.creator.username) ||
      regex.test(item.tag) ||
      regex.test(item.toolName) ||
      regex.test(item.description)
    )
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterTools(e.target.value)
        setSearchResults(searchResult)
      }, 500)
    )
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName)

    const searchResult = filterTools(tagName)
    setSearchResults(searchResult)
  }

  return (
    <section className='feed'>
      <form className="relative w-full flex-center">
        <input
        type="text"
        placeholder='Search for a tool name, a tag or a username'
        value={searchText}
        onChange={handleSearchChange}
        required
        className='search_input peer'
        
        />
      </form>

      {searchText ? (
        <ToolCardList
        data={searchResults}
        handleTagClick={handleTagClick}
        />
      ) : 
        <ToolCardList
        data={posts}
        handleTagClick={handleTagClick}
        />
      }
    </section>
  )
}

export default Feed