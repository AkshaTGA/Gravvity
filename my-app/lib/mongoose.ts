import mongoose from 'mongoose'

declare global {
  var __MONGO_CONN_PROMISE__: Promise<typeof mongoose> | undefined
}

export async function connectToDatabase() {
  const MONGO_URI = process.env.MONGO_URI
  if (!MONGO_URI) throw new Error('MONGO_URI is not set')

  if (!global.__MONGO_CONN_PROMISE__) {
    // Create a single connection promise for reuse across invocations
    global.__MONGO_CONN_PROMISE__ = mongoose.connect(MONGO_URI, { dbName: 'gravity' })
  }

  await global.__MONGO_CONN_PROMISE__
}

export default connectToDatabase
