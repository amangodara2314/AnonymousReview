import Post from "@/models/post.model";
import { connectToDatabase } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    console.log(params);
    const post = await Post.findById(params.id)
      .populate("createdBy")
      .select("-password");

    return NextResponse.json({
      message: "Posts Found",
      status: 200,
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
