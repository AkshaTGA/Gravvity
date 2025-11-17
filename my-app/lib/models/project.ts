import mongoose, { Schema, models, model } from 'mongoose'

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    wing: { type: String, required: true },
    link: { type: String },
    image: { type: String },
    technologies: { type: [String], default: [] },
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

ProjectSchema.virtual('id').get(function (this: any) {
  return this._id.toString()
})

export const Project = models.Project || model('Project', ProjectSchema)
export type ProjectDoc = mongoose.InferSchemaType<typeof ProjectSchema> & { id: string }
