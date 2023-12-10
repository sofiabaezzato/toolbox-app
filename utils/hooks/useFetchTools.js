'use client'
import { useState, useEffect } from "react"


const useFetchTools = (url) => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)


  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    setIsLoading(true)

    const fetchPosts = async () => {
      try {
        const response = await fetch(url, { cache: 'no-store' }, { signal })
        const data = await response.json()
        setPosts(data)
      } catch (error) {
      setError(error)
      console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchPosts()

    return () => {
      controller.abort()
    }
    
    } , [url])

  return { posts, isLoading, error }
}

export default useFetchTools