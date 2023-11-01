"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

function Settings() {
  const router = useRouter()
  
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/')
    }
  })

  const [newName, setNewName] = useState('')


  const handleUpdate = async (e) => {
    e.preventDefault()

    if (!session?.user.id) return alert('User id not found')
    try {
      const response = await fetch(`/api/users/${session.user.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          username: newName
        }),
      })

      if(response.ok) {
        router.push("/profile")
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="red_gradient">Settings</span>
      </h1>

      <h1>Signed in as:</h1>
      <input type="text" value={newName} onChange={e => setNewName(e.target.value)}/>
      {/* <Image
        src={session?.user.image}
        width={37}
        height={37}
        className="rounded-full"
        alt="profile"
      /> */}
      <button onClick={e => handleUpdate(e)}>update</button>


    </section>
  )
}

export default Settings