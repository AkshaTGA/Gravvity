import { Subscriber } from "@/lib/models/subscriber"
import connectToDatabase from "@/lib/mongoose"

export async function getSubscribers(): Promise<string[]> {
  try {
    await connectToDatabase()
    const subscribers = await Subscriber.find({}).select('email').lean()
    return subscribers.map((sub: any) => sub.email)
  } catch (e) {
    console.error("getSubscribers failed", e)
    throw new Error("Failed to fetch subscribers from database")
  }
}

export async function addSubscriber(email: string): Promise<boolean> {
  try {
    await connectToDatabase()
    const exists = await Subscriber.findOne({ email: email.toLowerCase() })
    if (exists) return false
    
    await Subscriber.create({ email: email.toLowerCase() })
    return true
  } catch (e) {
    console.error("addSubscriber failed", e)
    throw new Error("Failed to add subscriber to database")
  }
}

export async function removeSubscriber(email: string): Promise<boolean> {
  try {
    await connectToDatabase()
    const result = await Subscriber.deleteOne({ email: email.toLowerCase() })
    return result.deletedCount > 0
  } catch (e) {
    console.error("removeSubscriber failed", e)
    throw new Error("Failed to remove subscriber from database")
  }
}

export async function saveSubscribers(list: string[]) {
  try {
    await connectToDatabase()
    // Clear all existing subscribers
    await Subscriber.deleteMany({})
    // Insert new list
    if (list.length > 0) {
      await Subscriber.insertMany(list.map(email => ({ email: email.toLowerCase() })))
    }
  } catch (e) {
    console.error("saveSubscribers failed", e)
    throw new Error("Failed to save subscribers to database")
  }
}
