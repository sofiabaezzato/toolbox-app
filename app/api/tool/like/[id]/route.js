import { connectToDB } from "@utils/database";
import Tool from "@models/tool";

// PUT (like)
export const PUT = async (request, { params }) => {
  try {
    await connectToDB();
    const { userId } = await request.json()

    const existingTool = await Tool.findById(params.id);

    if (!existingTool) return new Response("Tool not found", { status: 404 });
    
    if (existingTool.likes.includes(userId) && existingTool.likeCount > 0) {
      existingTool.likeCount += -1
      const newUserList = existingTool.likes.filter(id => id.toString() !== userId)
      existingTool.likes = newUserList

    } else {
      existingTool.likeCount += 1;
      existingTool.likes.push(userId);

    }
    
    await existingTool.save();
    return new Response(JSON.stringify(existingTool), { status: 200 });
  } catch (error) {
    console.log(error.message);
    return new Response("Failed to like the tool", { status: 500 });
  }
}