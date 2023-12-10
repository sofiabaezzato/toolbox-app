"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form from '@components/Form'
import useFetchTools from '@utils/hooks/useFetchTools'

const EditTool = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const toolId = searchParams.get('id')

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    toolName: '',
    description: '',
    tag: [],
    url: '',
    price: '',
  })

  useEffect(() => {
    const getToolDetails = async () => {
      const response = await fetch(`/api/tool/${toolId}`)
      const data = await response.json()

      setPost({
        toolName: data.toolName,
        description: data.description,
        tag: data.tag,
        url: data.url,
        price: data.price
      })
    }

    if(toolId) getToolDetails()
  }, [toolId])

  const updateTool = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    if(!toolId) return alert('Tool id not found')
    try {
      const response = await fetch(`/api/tool/${toolId}`, {
        method: "PUT",
        body: JSON.stringify({
          toolName: post.toolName,
          description: post.description,
          tag: post.tag,
          url: post.url,
          price: post.price
        }),
      })

      if(response.ok) {
        router.push("/profile")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateTool}
    />
  )
}

export default EditTool