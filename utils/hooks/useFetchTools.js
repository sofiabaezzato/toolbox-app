'use client'
import { useState, useEffect } from "react"


const useFetchTools = (url, options) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const { method = 'GET', body = '' } = options || {}

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const fetchTools = async () => {
      setIsLoading(true)

      try {
        const response = await fetch(url, {
          method: method === 'GET' ? 'GET' : method,
          ...(method !== 'GET' && { body }),
        },
        { cache: 'no-store' },
        { signal }
        )

        if (!response.ok) throw new Error('Cannot fetch data')

        const fetchedData = await response.json()
        setData(fetchedData)

      } catch (error) {
        setError(error)
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchTools()

    return () => {
      controller.abort()
    }
    
  } , [url])

  return { data, isLoading, error }
}

export default useFetchTools