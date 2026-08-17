const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    wing: { type: String, required: true }, // e.g. "Web Development"

    devfolioLink: { type: String }, // renamed from generic `link`
    image: { type: String },

    technologies: { type: [String], default: [] },
    tags: { type: [String], default: [] },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        ret.id = ret._id?.toString()
        delete ret._id
        delete ret.__v
        if (ret.createdAt instanceof Date) ret.createdAt = ret.createdAt.getTime()
        if (ret.updatedAt instanceof Date) ret.updatedAt = ret.updatedAt.getTime()
        return ret
      },
    },
  }
);

ProjectSchema.virtual('id').get(function () {
  return this._id.toString()
})

module.exports =
  mongoose.models.Project || mongoose.model('Project', ProjectSchema);
