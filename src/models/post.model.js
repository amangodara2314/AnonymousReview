const { default: User } = require("@/app/models/user.model");
const { default: mongoose } = require("mongoose");

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
  reviews: [
    {
      type: String,
    },
  ],
});

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

module.exports = Post;
