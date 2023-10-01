"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'

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

  const handleClearInput = (e) => {
    e.preventDefault()
    setSearchText('')
  }

  return (
    <section className='feed'>
      <form className="relative flex max-w-xl search_input flex-between min-[40px]:">
        <input
        id='search'
        type="text"
        placeholder='Search for a tool name, a tag or a username'
        value={searchText}
        onChange={handleSearchChange}
        className='w-5/6 font-medium focus:border-black focus:outline-none focus:ring-0'
        />
        <button
        className='self-end'
        onClick={handleClearInput}
        >
          <Image
          src="icons/close.svg"
          width={20}
          height={20}
          alt='clear-input'
          className={searchText === '' ? "hidden" : "visible"}
          ></Image>
        </button>
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