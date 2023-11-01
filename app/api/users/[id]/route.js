import { connectToDB } from "@utils/database"
import User from "@models/user"

// PATCH (update)
export const PATCH = async (request, { params }) => {
  const { username } = await request.json()

  try {
    await connectToDB()

    const existingUser = await User.findById(params.id)

    if(!existingUser) return new Response("User not found", { status: 404})

    existingUser.username = username

    await existingUser.save()

    return new Response(JSON.stringify(existingUser, { status: 200 }))
  } catch (error) {
    console.log(error.message)
    return new Response("Failed to update Username", { status: 500 })
  }
}