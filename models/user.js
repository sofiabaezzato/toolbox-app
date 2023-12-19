import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    unique: [true, 'User already exists!'],
    required: [true, 'Username is required!'],
    minLength: 1,
    maxLength: 30,
  },
  image: {
    type: String,
  },
  city: {
    type: String,
    minLength: [2, 'Must be at least 2 characters.'],
    maxLength: [20, 'Too long.']
  },
  website: {
    type: String,
  },
  bio: {
    type: String,
    maxLength: [200]
  }
})

const User = models.User || model("User", UserSchema)

export default User