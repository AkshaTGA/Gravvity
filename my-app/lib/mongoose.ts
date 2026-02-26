import mongoose from 'mongoose'

declare global {
  var __MONGO_CONN_PROMISE__: Promise<typeof mongoose> | undefined
  var __MONGO_CONN_BLOCKED_UNTIL__: number | undefined
}

const MONGO_RETRY_BACKOFF_MS = 60_000

export async function connectToDatabase() {
  const MONGO_URI = process.env.MONGO_URI
  if (!MONGO_URI) throw new Error('MONGO_URI is not set')

  const blockedUntil = global.__MONGO_CONN_BLOCKED_UNTIL__
  if (typeof blockedUntil === 'number' && blockedUntil > Date.now()) {
    throw new Error('MongoDB connection temporarily disabled after previous failure')
  }

  if (!global.__MONGO_CONN_PROMISE__) {
    // Create a single connection promise for reuse across invocations
    const dbNameMatch = MONGO_URI.match(/\/([^/?]+)(\?|$)/)
    const dbName = dbNameMatch ? dbNameMatch[1] : 'gravity'
    global.__MONGO_CONN_PROMISE__ = mongoose
      .connect(MONGO_URI, {
        dbName,
        serverSelectionTimeoutMS: 5000,
      })
      .then((conn) => {
        global.__MONGO_CONN_BLOCKED_UNTIL__ = undefined
        return conn
      })
      .catch((error) => {
        global.__MONGO_CONN_PROMISE__ = undefined
        global.__MONGO_CONN_BLOCKED_UNTIL__ = Date.now() + MONGO_RETRY_BACKOFF_MS
        throw error
      })
  }

  await global.__MONGO_CONN_PROMISE__
}

export default connectToDatabase
