"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

const Settings = () => {
  const router = useRouter()
  
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/')
    }
  })

  const [newName, setNewName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState()
  const userId = session?.user.id

  useEffect(() => {
    const getUserDetails = async () => {
      const response = await fetch(`/api/users/${userId}`)
      const data = await response.json()

      setNewName(data.username)
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
          username: newName
        }),
      })

      if (!response.ok) throw new Error ('Invalid username: it should contain 4-20 characters and no spaces.')
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
        <label>
        <span className="font-satoshi font-semibold text-base text-gray-700">
          Username
        </span>

        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New username" required
          className="form_input"
        />
        {error && (
        <p
          className="mt-2 text-xs text-red-700"
        >{error}</p>
        )}
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