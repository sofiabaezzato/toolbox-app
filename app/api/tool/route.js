import { connectToDB } from "@utils/database"
import Tool from "@models/tool"

export const GET = async (request) => {
  try {
    await connectToDB()

    const tools = await Tool.find({}).populate('creator')

    return new Response(JSON.stringify(tools), { status: 200 })
  } catch (error) {
    console.log(error.message)
    return new Response("Failed to fetch all tools", { status: 500} )
  }
}

export const dynamic = "force-dynamic"