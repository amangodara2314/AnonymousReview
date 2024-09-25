import Post from "@/models/post.model";
import { connectToDatabase } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const post = await Post.findById(params.id)
      .populate("createdBy")
      .select(["-password", "-reviews"]);

    if (!post.isActive) {
      return NextResponse.json({
        message: "This post is now inactive.",
        status: 500,
      });
    }
    if (post) {
      return NextResponse.json({
        message: "Post Found",
        status: 200,
        post,
      });
    }

    return NextResponse.json({
      message: "Post Not Found",
      status: 404,
      post,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Internal Server Error",
      status: 500,
    });
  }
}

export async function POST(req, { params }) {
  try {
    const body = await req.json();
    const { review } = body;
    await connectToDatabase();
    const post = await Post.findById(params.id);
    const newReview = {
      text: review,
    };
    post.reviews.unshift(newReview);
    await post.save();

    return NextResponse.json({
      message: "Review Submitted",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Internal Server Error",
      status: 500,
    });
  }
}
