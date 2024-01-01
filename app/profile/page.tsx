"use client"

import Profile from "@components/Profile"
import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import ConfirmationModal from "@components/ConfirmationModal"
import { Post } from "@utils/types"

type PostType = 'yourTools' | 'favorites'

const MyProfile = () => {
  const router = useRouter()
  const { data: session } = useSession()
  
  const [myPosts, setMyPosts] = useState<Post[] | []>([])
  const [userDetails, setUserDetails] = useState({
    username: '',
    image: '',
    city: '',
    website: '',
    bio: '',
  })
  const [postType, setPostType] = useState<PostType>('yourTools')
 
  const [isModalOpen, setIsModalOpen] = useState(false)
  const postDeleted = useRef<Post | null>(null)

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

  const handleDelete = async () => {
    const post : Post = postDeleted.current
    try {
      await fetch(`api/tool/${post._id.toString()}`, {
        method: 'DELETE'
      })

      const filteredPosts = myPosts.filter((item : Post) => item._id !== post._id)

      setMyPosts(filteredPosts)
    } catch (error) {
      console.log(error.message)
    } finally {
      postDeleted.current = null
      setIsModalOpen(false)
    }
  }


  return (
    <>
      <Profile
        name="My"
        desc="Welcome to your personal toolbox"
        data={myPosts}
        handleSettings={handleSettings}
        session={session}
        postType={postType}
        setPostType={setPostType}
        userDetails={userDetails}
        setIsModalOpen={setIsModalOpen}
        postDeleted={postDeleted}
      />
      {isModalOpen ?
        <ConfirmationModal 
          isModalOpen={isModalOpen}
          handleModalClose={() => setIsModalOpen(false)}
          handleDelete={handleDelete}
        /> : null}
    </>
    
  )
}

export default MyProfile