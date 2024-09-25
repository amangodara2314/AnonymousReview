import Post from "@/models/post.model";
import { connectToDatabase } from "@/utils/database";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req, { params }) {
  await connectToDatabase();

  try {
    const decoded = jwt.verify(
      cookies().get("Auth-Token").value,
      process.env.JWT_SECRET
    );

    const post = await Post.findById(params.id);
    if (!post) {
      return NextResponse.json({
        message: "Post Not Found",
        status: 404,
      });
    }

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
