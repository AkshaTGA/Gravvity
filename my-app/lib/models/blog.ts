import mongoose, { Schema, models, model } from 'mongoose'

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    name: { type: String, required: true },
    rollNumber: { type: String, required: true },
    mediumUrl: { type: String, required: true },
    datePublished: { type: String, required: true },
    approved: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret: any) => {
        ret.id = ret._id?.toString()
        delete ret._id
        delete ret.__v
        if (ret.createdAt instanceof Date) ret.createdAt = ret.createdAt.getTime()
        if (ret.updatedAt instanceof Date) ret.updatedAt = ret.updatedAt.getTime()
        return ret
      },
    },
  }
)

BlogSchema.virtual('id').get(function (this: any) {
  return this._id.toString()
})

export const Blog = models.Blog || model('Blog', BlogSchema)
export type BlogDoc = mongoose.InferSchemaType<typeof BlogSchema> & { id: string }
