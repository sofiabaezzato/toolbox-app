"use client"

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Form from '@components/Form_draft'

const AddTool = () => {
  const router = useRouter()
  const { data: session } = useSession()

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    toolName: '',
    description: '',
    tag: [],
    url: '',
    price: 'free',
  })

  const addTool = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch("/api/tool/new", {
        method: "POST",
        body: JSON.stringify({
          toolName: post.toolName,
          userId: session?.user.id,
          description: post.description,
          tag: post.tag,
          url: post.url,
          price: post.price
        }),
      })

      if(response.ok) {
        router.push("/")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type="Add"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={addTool}
    />
  )
}

export default AddTool