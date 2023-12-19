"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import ToolCardList from './ToolCardList'
import { useSearchParams, useRouter } from 'next/navigation'
import useFetchTools from '@utils/hooks/useFetchTools'
import Loading from './Loading'

const Feed = () => {
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [view, setView] = useState('list')

  const router = useRouter()
  const searchParams = useSearchParams()
  const searchText = searchParams.get('search') || ''

  // fetch all tools
  const { data: posts, isLoading, error } = useFetchTools('/api/tool')

  // re-render feed when a URL with a search query is pasted
  useEffect(() => {
    handleSearchChange(searchText)
  },[posts])

  // save the search query in the URL, filter the tool list based on the query
  // and save the results in the state
  const handleSearchChange = (searchText) => {
    clearTimeout(searchTimeout)

    setSearchTimeout(
      setTimeout(() => {
        router.replace(`?search=${searchText}`, {
          scroll: false,
          shallow: true
        })

        const searchResult = filterTools(searchText)
        setSearchResults(searchResult)
      }, 300)
    )
  }

  const handleTagClick = (tagName) => {
    router.push(`?search=${tagName}`, {
      scroll: false,
      shallow: true
    })

    const searchResult = filterTools(tagName)
    setSearchResults(searchResult)
  }

  const filterTools = (searchText) => {
    const regex = new RegExp(searchText, "i")

    return posts.filter((item) =>
      regex.test(item.creator.username) ||
      regex.test(item.tag) ||
      regex.test(item.toolName) ||
      regex.test(item.description)
    )
  }

  const handleClearInput = (e) => {
    e.preventDefault()
    router.push(`/`, {
      scroll: false,
    })
  }

  const viewPreference = (view) => {
    localStorage.setItem("viewPreference", view)
    setView(view)
  }

  useEffect(() => {
    const savedView = localStorage.getItem("viewPreference")
    if (savedView) setView(savedView)
  })

  return (
    <section className='feed'>
      <form className="relative flex max-w-xl search_input flex-between min-w-[40px]">
        <input
          id='search'
          type="text"
          placeholder='Search a tool name or a tag'
          key={searchText.toString()}
          defaultValue={searchText}
          onChange={e => handleSearchChange(e.target.value)}
          className='w-5/6 font-medium focus:border-black focus:outline-none focus:ring-0'
          autoFocus
          data-cy="search"
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

      <div className='mt-16 w-full'>
        <div className='flex gap-4 px-[1.5rem] sm:px-8 py-2 justify-center'>
          <button
          className={view === 'list' ? 'text-red-600 font-semibold border-b-2 border-red-600' : 'text-gray-700 hover:text-gray-500'}
            onClick={() => viewPreference('list')}
          >
            List
          </button>
          <button
            className={view === 'grid' ? 'text-red-600 font-semibold border-b-2 border-red-600' : 'text-gray-700 hover:text-gray-500'}
            onClick={() => viewPreference('grid')}
          >
            Grid
          </button>
        </div>

        {isLoading ? <Loading />
          : searchText ? (
            <ToolCardList
              data={searchResults}
              handleTagClick={handleTagClick}
              view={view}
            />
          ) : (
            <ToolCardList
              data={posts}
              handleTagClick={handleTagClick}
              view={view}
            />
          )
        }

        {error ? 
          <div className='pt-28 flex flex-col gap-4 justify-center items-center'>
            <p className='desc'>
              Cannot load tools. Please, reload the page and try again.
            </p>
          </div>
          : null
        }
      </div>

    </section>
  )
}

export default Feed