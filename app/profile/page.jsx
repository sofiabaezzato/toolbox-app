"use client"

import Profile from "@components/Profile"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const MyProfile = () => {
  const router = useRouter()
  const { data: session } = useSession()
  
  const [myPosts, setMyPosts] = useState([])
  const [userDetails, setUserDetails] = useState({
    username: '',
    image: '',
    city: '',
    website: '',
    bio: '',
  })
  const [postType, setPostType] = useState('yourTools')

  useEffect(() => {
    const getUserDetails = async () => {
      const response = await fetch(`/api/users/${session?.user.id}`)
      const data = await response.json()

      setUserDetails({
        username: data.username,
        image: data.image,
        city: data.city,
        website: data.website,
        bio: data.bio
      })
    }

    if (session?.user.id) getUserDetails()
  },[])

  useEffect(() => {
    const apiUrl = postType === 'yourTools' ? `/api/users/${session?.user.id}/posts` : `/api/users/${session?.user.id}/favorites`

    const fetchPosts = async () => {
      const response = await fetch(apiUrl, {cache: 'no-store'})
      const data = await response.json()

      setMyPosts(data)
    }

    if (session?.user.id) fetchPosts()
    else {
      router.push('/')
    }
  }, [postType])

  const handleSettings = () => {
    router.push(`/profile/settings`)
  }

  /* const handleEdit = (post) => {
    router.push(`/update-tool?id=${post._id}`)
  } */

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
      // handleEdit={handleEdit}
      handleDelete={handleDelete}
      handleSettings={handleSettings}
      session={session}
      postType={postType}
      setPostType={setPostType}
      userDetails={userDetails}
    />
  )
}

export default MyProfile