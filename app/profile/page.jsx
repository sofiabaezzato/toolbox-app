"use client"

import Profile from "@components/Profile"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const MyProfile = () => {
  const router = useRouter()
  const { data: session } = useSession()
  
  const [myPosts, setMyPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`, {cache: 'no-store'})
      const data = await response.json()

      setMyPosts(data)
    }

    if(session?.user.id) fetchPosts()
    else {
      router.push('/')
    }
  }, [])

  const handleSettings = () => {
    router.push(`/profile/settings`)
  }

  const handleEdit = (post) => {
    router.push(`/update-tool?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    const hasConfirmid = confirm("Are you sure you want to delete this tool?")

    if(hasConfirmid) {
      try {
        await fetch(`api/tool/${post._id.toString()}`, {
          method: 'DELETE'
        })

        const filteredPosts = myPosts.filter((item) => item._id !== post._id)

        setMyPosts(filteredPosts)
      } catch (error) {
        console.log(error.message)
      } 
    }
  }

  return (
    <Profile
      name="My"
      desc="Welcome to your personal toolbox"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      handleSettings={handleSettings}
      session={session}
    />
  )
}

export default MyProfile