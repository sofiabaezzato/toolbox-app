import { connectToDB } from "@utils/database"
import Tool from "@models/tool"

// GET (read)
export const GET = async (request, { params }) => {
  try {
    await connectToDB()

    const tool = await Tool.findById(params.id).populate('creator')

    if(!tool) return new Response("Tool not found", { status: 404 })

    return new Response(JSON.stringify(tool), { status: 200 })
  } catch (error) {
    console.log(error.message)
    return new Response("Failed to fetch all tools", { status: 500} )
  }
}

// PATCH (update)
export const PATCH = async (request, { params }) => {
  const { toolName, description, url, tag, price } = await request.json()

  try {
    await connectToDB()

    const existingTool = await Tool.findById(params.id)

    if(!existingTool) return new Response("Tool not found", { status: 404})

    existingTool.toolName = toolName
    existingTool.description = description
    existingTool.url = url
    existingTool.tag = tag
    existingTool.price = price

    await existingTool.save()

    return new Response(JSON.stringify(existingTool, { status: 200 }))
  } catch (error) {
    console.log(error.message)
    return new Response("Failed to update tool", { status: 500 })
  }
}

// DELETE (delete)
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB()

    await Tool.findByIdAndDelete(params.id)

    return new Response("Tool deleted successfully", { status: 200 })
  } catch (error) {
    console.log(error.message)
    return new Response("Failed to delete tool", { status: 500 })
  }
}