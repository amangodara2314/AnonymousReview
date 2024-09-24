const { default: User } = require("@/app/models/user.model");
const { default: mongoose } = require("mongoose");

const reviewSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageLink: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reviews: [reviewSchema],
});

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

module.exports = Post;
