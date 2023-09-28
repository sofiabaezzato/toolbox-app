"use client"

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import Form from '@components/Form'

const AddTool = () => {
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    toolName:'',
    description:'',
    tag:'',
    url:'',
    price:'',
  })

  const addTool = async (e) => {

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