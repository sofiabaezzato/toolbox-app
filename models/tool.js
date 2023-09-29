import { Schema, model, models } from "mongoose";

const ToolSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  toolName: {
    type: String,
    required: [true, 'Tool name is required.']
  },
  description: {
    type: String,
    required: [true, 'Description is required.']
  },
  tag: {
    type: [String]
  },
  url: {
    type: String,
    required: [true, 'A website is required']
  },
  price: {
    type: String,
    required: [true, 'Pricing is required'],
  }
})

const Tool = models.Tool || model('Tool', ToolSchema)

export default Tool