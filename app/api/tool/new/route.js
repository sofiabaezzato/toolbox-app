import { connectToDB } from "@utils/database"
import Tool from "@models/tool"

export const POST = async (request) => {
  const { userId, toolName, description, tag, url, price } = await request.json()

  try {
    await connectToDB()
    const newTool = new Tool({ creator: userId, toolName, description, tag, url, price })

    await newTool.save()

    return new Response(JSON.stringify(newTool), { status: 201 })
  } catch (error) {
    console.log(error.message)
    return new Response("Failed to add a new tool", { status: 500 })
  }
}

