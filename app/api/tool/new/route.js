import { connectToDB } from "@utils/database"
import Tool from "@models/tool"

export const POST = async (request) => {
  const { userId, toolName, description, tag, url, price } = await request.json()
  /* console.log("Received Data:", { userId, toolName, description, tag, url, price }); */

  try {
    await connectToDB()

    const tagsArray = Array.isArray(tag) ? tag : [tag];

    const newTool = new Tool({ creator: userId, toolName, description, tag: tagsArray, url, price })
    
    await newTool.save()
    /* console.log("Saved Tool:", newTool); */
    return new Response(JSON.stringify(newTool), { status: 201 })
  } catch (error) {
    console.log("This is a API route error: " + error.message)
    return new Response("Failed to add a new tool", { status: 500 })
  }
}

