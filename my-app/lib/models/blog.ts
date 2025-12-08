import mongoose, { Schema, models, model } from "mongoose";

const SCHEMA_VERSION = 3; // Increment this when schema changes

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    rollNumber: { type: String, required: true },
    mediumUrl: { type: String, required: true },
    image: { type: String, required: false },
    category: { type: String, required: false },
    content: { type: String, required: false },
    date: { type: String, required: true },
    approved: { type: Boolean, default: false },
    schemaVersion: { type: Number, default: SCHEMA_VERSION },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret: any) => {
        ret.id = ret._id?.toString();
        delete ret._id;
        delete ret.__v;
        if (ret.createdAt instanceof Date)
          ret.createdAt = ret.createdAt.getTime();
        if (ret.updatedAt instanceof Date)
          ret.updatedAt = ret.updatedAt.getTime();
        return ret;
      },
    },
  }
);

BlogSchema.virtual("id").get(function (this: any) {
  return this._id.toString();
});

// Migration function to handle schema changes
async function migrateIfNeeded() {
  try {
    if (mongoose.connection.readyState !== 1) return;

    const BlogModel = models.Blog || model("Blog", BlogSchema);

    // Check if collection exists and has old schema
    const collections = await mongoose.connection.db
      ?.listCollections({ name: "blogs" })
      .toArray();
    if (!collections || collections.length === 0) return;

    // Check for documents with old schema (missing required fields or old field names)
    const sampleDoc = await BlogModel.findOne().lean();
    if (sampleDoc) {
      const hasOldSchema =
        "name" in sampleDoc ||
        "imageUrl" in sampleDoc ||
        "datePublished" in sampleDoc ||
        !("author" in sampleDoc) ||
        !("schemaVersion" in sampleDoc) ||
        (sampleDoc as any).schemaVersion < SCHEMA_VERSION;

      if (hasOldSchema) {
        console.log(
          "[Blog Migration] Detected old schema, clearing collection..."
        );
        await BlogModel.collection.drop();
        console.log(
          "[Blog Migration] Collection cleared, ready for new schema"
        );
      }
    }
  } catch (error: any) {
    // Ignore errors if collection doesn't exist
    if (error.message?.includes("ns not found")) {
      console.log(
        "[Blog Migration] Collection does not exist yet, will be created on first insert"
      );
    } else {
      console.error("[Blog Migration] Error during migration:", error.message);
    }
  }
}

// Initialize the model
let Blog: mongoose.Model<any>;

// Clear any cached model to force re-initialization
if (models.Blog) {
  delete models.Blog;
}

Blog = model("Blog", BlogSchema);

// Always run migration on import
if (mongoose.connection.readyState === 1) {
  migrateIfNeeded().catch(console.error);
}

export { Blog, migrateIfNeeded };
export type BlogDoc = mongoose.InferSchemaType<typeof BlogSchema> & {
  id: string;
};
