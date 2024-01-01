import { ObjectId } from "mongodb"

export type Post = {
  _id?: ObjectId
  creator?: Creator
  toolName: string
  description: string
  tag: string[]
  url: string
  price: string
  likeCount?: number
  likes?: ObjectId[]
}

type Creator = {
  _id: ObjectId
  email: string
  username: string
  image?: string
  city?: string
  website?: string
  bio?: string
}

