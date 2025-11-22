import mongoose, { Schema, models, model } from "mongoose";

// Align schema with provided BlogSubmissionSchema
const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    author: { type: String },
    date: { type: String },
    category: { type: String },
    image: { type: String },
    rollNumber: { type: String },
    mediumUrl: { type: String },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "rejected",
    },
    createdAt: { type: Number, default: () => Date.now() },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (_doc, ret: any) => {
        ret.id = ret._id?.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

BlogSchema.virtual("id").get(function (this: any) {
  return this._id.toString();
});

// Ensure schema updates take effect in dev by deleting existing model definition
try {
  if (mongoose.models.Blog) {
    // Available in Mongoose v7+
    (mongoose as any).deleteModel?.("Blog");
  }
} catch {}

export const Blog = models.Blog || model("Blog", BlogSchema);
export type BlogDoc = mongoose.InferSchemaType<typeof BlogSchema> & {
  id: string;
};
