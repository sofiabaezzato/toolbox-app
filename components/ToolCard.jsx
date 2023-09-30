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
      <div className=" flex flex-col items-start">
        <div className="flex justify-between items-center w-full mb-1" >
          <h3 className="font-satoshi text-xl font-semibold text-gray-900">
            {post.toolName}
          </h3>

          <Link href={post.url}
          className="font-inter text-xs blue_gradient cursor-pointer font-semibold flex gap-2 items-center"
          >
            <Image
              src="/icons/link.svg"
              width={18}
              height={18}
              alt="link icon"
            />
            Website
          </Link>
            
        </div>

        <div className="flex justify-center gap-2 items-center mb-2">
          <div
          className={post.price.toLowerCase() === 'pay' ?
          "w-2 h-2 rounded-full bg-red-400" :
          "w-2 h-2 rounded-full bg-green-400"}
          ></div>
          <p className="font-satoshi text-xs text-gray-700">{post.price.charAt(0).toUpperCase() + post.price.slice(1)}</p>
        </div>

        <ul className="flex gap-2">
          {post.tag.map((tag, index) => (
            <li
              key={index}
              onClick={() => handleTagClick && handleTagClick(post.tag)}
              className="badge cursor-pointer"
              >
              <span
              className="text-xs"
              >{tag}</span>
            </li>
          ))}
        </ul>

        <p className="mt-4 mb-6 font-satoshi text-sm text-gray-700">
          {post.description}
        </p>


        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={34}
            height={34}
            className="rounded-full object-contain"
          />

          <h3 className="font-satoshi text-gray-900 text-xs">
            {post.creator.username}
          </h3>
          
        </div>
      </div>
      
      

      
      
      

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