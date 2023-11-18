"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const ToolCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession()
  const pathName = usePathname()
  const router = useRouter()

  // Currently, useOptimistic isn't functioning as expected, hence we're storing likeCount in a state.
  // This practice introduces a double source of truth, which is not ideal (to be optimistic :)
  const [optimisticLikeCount, setOptimisticLikeCount] = useState(post.likeCount || 0)
  const [liked, setLiked] = useState()

  // If user is logged in, update the like state to true or false to display the right icon
  useEffect(() => {
    if (session?.user.id) {
      {post.likes.includes(session.user.id) ? setLiked(true) : setLiked(false)}
    }

  }, [])

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile")

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`)
  }

  const handleLike = async (e) => {
    e.preventDefault()

    // Handle user not logged in
    if (!session?.user.id) return alert('You need to sign-in!')

    // Add or remove like count in the state
    if (liked && optimisticLikeCount > 0) setOptimisticLikeCount(prev => prev - 1)
    else if (!liked) setOptimisticLikeCount(prev => prev + 1)

    // Update state of the like to true or false
    setLiked(prev => !prev)

    // Update like count and add or remove user id in the tools' database
    try {
      const response = await fetch(`/api/tool/like/${post._id}`, {
        method: "PATCH",
        body: JSON.stringify({ userId: session?.user.id }),
      })
      console.log(response)
      if (!response.ok) throw new Error ('Error, please try again.')
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className="tool_card">
      <div className=" flex flex-col items-start">
        <div className="flex justify-between items-center w-full mb-1 gap-2" >
          <h3 className="font-satoshi text-xl font-semibold text-gray-900 truncate">
            {post.toolName}
          </h3>

          <Link href={post.url} target="_blank"
          className="font-inter text-xs blue_gradient cursor-pointer font-semibold flex gap-2 items-center"
          >
            Website
            <Image
              src="/icons/right-arrow.svg"
              width={12}
              height={12}
              alt="link icon"
            />
          </Link>
        </div>

        <div className="flex justify-center gap-2 items-center mb-2">
          <div
          className={post.price.toLowerCase() === 'pay' ?
          "w-2 h-2 rounded-full bg-red-400" :
          "w-2 h-2 rounded-full bg-green-400"}
          ></div>
          <p className="font-satoshi text-xs text-gray-700">
            {post.price.charAt(0).toUpperCase() + post.price.slice(1)}</p>
        </div>

        <ul className="flex gap-1 flex-wrap my-1">
          {post.tag.map((tag, index) => (
            <li
              key={index}
              onClick={() => handleTagClick && handleTagClick(post.tag[index])}
              className="badge cursor-pointer"
              >
              <span
              className="text-xs"
              >{tag}</span>
            </li>
          ))}
        </ul>

        <p className="mt-4 mb-6 font-satoshi text-sm text-gray-700 max-w-full">
          {post.description}
        </p>

        <div className="flex justify-between w-full items-center">
          <div className="flex-1 flex justify-start items-center gap-2 cursor-pointer"
          onClick={handleProfileClick}
          >
            <Image
              src={post.creator.image}
              alt="user_image"
              width={30}
              height={30}
              className="rounded-full object-cover h-[30px]"
              key={crypto.randomUUID()}
            />
            <p className="font-satoshi text-gray-900 text-xs">
              @{post.creator.username}
            </p>
          
          </div>

          <div className="flex gap-1 items-center">
            <p className="font-satoshi text-gray-900 text-xs">
              {optimisticLikeCount}
            </p>
            <button
              onClick={handleLike}
            >
              {liked ? (
                <Image
                  src="/icons/star-solid.svg"
                  width={18}
                  height={18}
                  alt="like icon"
                  className="w-[18px] h-[18px]"
                />
              ) : (
                <Image
                  src="/icons/star-regular.svg"
                  width={18}
                  height={18}
                  alt="like icon"
                  className="w-[18px] h-[18px]"
                />
              )}
              
            </button>
          </div>
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