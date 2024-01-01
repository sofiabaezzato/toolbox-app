import { connectToDB } from "@utils/database"
import Tool from "@models/tool"
import { Post } from "@utils/types"

type Tools = Post[]

export const GET = async (request : Request) => {
  try {
    await connectToDB()

    const tools : Tools = await Tool.find({}).populate('creator')

    return new Response(JSON.stringify(tools), { status: 200 })
  } catch (error) {
    console.log(error.message)
    return new Response("Failed to fetch all tools", { status: 500} )
  }
}

export const dynamic = "force-dynamic"