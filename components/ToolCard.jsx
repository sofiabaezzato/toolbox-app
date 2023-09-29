"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

const ToolCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession()
  const pathName = usePathname()
  const router = useRouter()

  return (
    <div className="tool_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

      </div>
      

      <h3 className="my-2 font-satoshi font-semibold text-gray-900">
        {post.toolName}
      </h3>
      <p className="my-2 font-satoshi text-sm text-gray-700">
        {post.description}
      </p>
      <p className="font-inter text-sm blue_gradient cursor-pointer"
      onClick={() => handleTagClick && handleTagClick(post.tag)}>
        {post.tag}
      </p>
      <Link href={post.url}
      className="font-inter text-sm blue_gradient cursor-pointer"
      >
        Website
      </Link>

      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm text-gray-700 cursor-pointer"
          onClick={handleEdit}
          >
            Edit
          </p>
          <p className="font-inter text-sm text-red-600 cursor-pointer"
          onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default ToolCard