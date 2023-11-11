'use client'

import Feed from "@components/Feed"
import { useState, useEffect } from "react"

const Home = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/tool', { next: { revalidate: 0} })
      const data = await response.json()
  
      setPosts(data)
    }
    
    fetchPosts()
  }, [])

  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Discover & Share
            <br className="max-md:hidden" />
            <span className="red_gradient text-center"> Powerful Tools</span>
        </h1>
        <p className="desc text-center">
            ToolBox is an open-source database of the most useful tools on the internet
        </p>
        <Feed
          posts={posts}
        />
    </section>
  )
}

export default Home