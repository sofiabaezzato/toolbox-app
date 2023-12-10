"use client"

import Profile from "@components/Profile"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams()
  const userName = searchParams.get("name")
  
  const [userPosts, setUserPosts] = useState([])
  const [userDetails, setUserDetails] = useState({
    username: '',
    city: '',
    website: '',
    bio: '',
  })

  useEffect(() => {
    const getUserDetails = async () => {
      const response = await fetch(`/api/users/${params?.id}`)
      const data = await response.json()

      setUserDetails({
        username: data.username,
        city: data.city,
        website: data.website,
        bio: data.bio
      })
    }

    if (params?.id) getUserDetails()
  },[])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`)
      const data = await response.json()

      setUserPosts(data)
    }

    if(params?.id) fetchPosts()
  }, [params.id])

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName} personal toolbox`}
      data={userPosts}
      userDetails={userDetails}
    />
  )
}

export default UserProfile