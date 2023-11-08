"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { UploadButton } from "@utils/uploadthings"

const Settings = () => {
  const router = useRouter()
  
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/')
    }
  })

  const [userDetails, setUserDetails] = useState({
    username: '',
    image: '/images/default-profile.jpg',
    city: '',
    website: '',
    bio: '',
  })

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState()
  const userId = session?.user.id

  useEffect(() => {
    const getUserDetails = async () => {
      const response = await fetch(`/api/users/${userId}`)
      const data = await response.json()

      setUserDetails({
        username: data.username,
        image: data.image,
        city: data.city,
        website: data.website,
        bio: data.bio
      })
    }

    if (userId) getUserDetails()
  },[userId])

  const handleUpdate = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    if (!userId) return alert('User id not found')
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        body: JSON.stringify({
          username: userDetails.username,
          image: userDetails.image,
          city: userDetails.city,
          website: userDetails.website,
          bio: userDetails.bio
        }),
      })

      if (!response.ok) throw new Error ('Error updating user details')
      else if (response.ok) router.push("/profile")
    } catch (error) {
      setError(error.message)
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }
  
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="red_gradient">Settings</span>
      </h1>

      <form
        onSubmit={e => handleUpdate(e)}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <div className="flex gap-4">
          <Image 
            src={userDetails?.image}
            width={100}
            height={100}
            className="rounded-full object-cover h-[100px]"
            alt="profile"
          />
          <UploadButton
            content={{
              button({ ready, isUploading }) {
                if (isUploading) return <p>Loading...</p>
                if (ready) return <p>Change Image</p>
              }
            }}
            className='ut-button:text-xs ut-button:border-red-600 ut-button:border ut-button:bg-transparent ut-button:rounded-full ut-button:text-red-600 ut-button:font-semibold ut-label:text-xs ut-label:px-5 ut-label:py-1.5 ut-allowed-content:font-satoshi ut-allowed-content:hidden ut-button:ut-readying:bg-red-600 ut-button:ut-readying:text-white ut-button:ring-transparent hover:ut-button:bg-red-600 hover:ut-button:text-white after:ut-button:ut-uploading:bg-red-600'
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              /* console.log("File: ", res[0].url); */
              setUserDetails({...userDetails, image: res[0].url})
            }}
            onUploadError={(error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
        

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Username
          </span>

          <input
            type="text"
            value={userDetails.username}
            onChange={(e) => setUserDetails({...userDetails, username: e.target.value})}
            placeholder="New username" required
            className="form_input"
          />
          {error && (
          <p
            className="mt-2 text-xs text-red-700"
          >{error}</p>
          )}
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            City
          </span>

          <input
            type="text"
            value={userDetails.city}
            onChange={(e) => setUserDetails({...userDetails, city: e.target.value})}
            placeholder="Add a location" 
            className="form_input"
          />
          {error && (
          <p
            className="mt-2 text-xs text-red-700"
          >{error}</p>
          )}
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Website
          </span>

          <input
            type="url"
            value={userDetails.website}
            onChange={(e) => setUserDetails({...userDetails, website: e.target.value})}
            placeholder="Add a link"
            className="form_input"
          />
          {error && (
          <p
            className="mt-2 text-xs text-red-700"
          >{error}</p>
          )}
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Bio
          </span>

          <textarea
            value={userDetails.bio}
            onChange={(e) => setUserDetails({...userDetails, bio: e.target.value})}
            placeholder="Add your bio"
            className="form_textarea"
          />
        </label>
        

        <div className="flex-end mx-3 mb-5 gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-red-600 rounded-full text-white font-semibold"
          >
            {submitting ? 'Update...' : 'Update'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Settings