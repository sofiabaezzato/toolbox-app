import { ObjectId } from "mongodb"

export type Post = {
  _id?: ObjectId
  creator?: User
  toolName: string
  description: string
  tag: string[]
  url: string
  price: string
  likeCount?: number
  likes?: ObjectId[]
}

export type User = {
  _id?: ObjectId
  email?: string
  username?: string
  image?: string
  city?: string
  website?: string
  bio?: string
}

