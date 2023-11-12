import mongoose from "mongoose";

let dbConnection = null

export const connectToDB = async () => {
  if(dbConnection) {
    return dbConnection
  }

  try {
    dbConnection = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "add_tool"
    })
    console.log('MongoDB is connected')
    return dbConnection
    
  } catch (error) {
    console.log(error)
    throw new Error('Failed to connect to MOngoDB')
  }
}

export const isDBConnected = () => {
  return !!dbConnection
}