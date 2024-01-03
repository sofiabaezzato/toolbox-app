import { connectToDB } from "@utils/database"
import User from "@models/user"

// GET (read)
export const GET = async (request, { params }) => {
  try {
    await connectToDB()
    const user = await User.findById(params.id).select('-email')

    if(!user) return new Response("User not found", { status: 404 })

    return new Response(JSON.stringify(user), { status: 200 })
  } catch (error) {
    console.log(error.message)
    return new Response("Failed to fetch user details", { status: 500} )
  }
}

// PATCH (update)
export const PATCH = async (request, { params }) => {
  const { username, image, city, website, bio } = await request.json()

  try {
    await connectToDB()

    const existingUser = await User.findByIdAndUpdate(params.id, {
      username: username,
      image: image,
      city: city,
      website: website,
      bio: bio
    }, { new: true })

    /* console.log(existingUser) */

    if(!existingUser) return new Response("User not found", { status: 404})

    return new Response(JSON.stringify(existingUser, { status: 200 }))
  } catch (error) {
    console.log(error.message)
    return new Response("Failed to update user details", { status: 500 })
  }
}

export const fetchCache = 'force-no-store'