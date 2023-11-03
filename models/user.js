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
    match: [/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 4-20 alphanumeric letters and be unique!"]
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