import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  type: String,
  articleUrl: String,
  headline: String,
  datePosted: String,
  imageUrl: String,
});

// generate createdAt and updatedAt
articleSchema.set("timestamps", true);

const ArticleModel = mongoose.model("article", articleSchema);

export default ArticleModel;
