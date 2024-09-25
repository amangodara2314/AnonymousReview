import Post from "@/models/post.model";
import { connectToDatabase } from "@/utils/database";
import { upload, uploadToS3 } from "@/utils/s3";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function PUT(req, { params }) {
  try {
    const decoded = jwt.verify(
      cookies().get("Auth-Token").value,
      process.env.JWT_SECRET
    );
    const body = await req.json();
    const { status, id } = body;
    await connectToDatabase();
    const post = await Post.findById(id);
    post.isActive = status;
    await post.save();

    return NextResponse.json({
      message: `Post is now ${status ? "active" : "paused"}`,
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

export async function POST(req) {
  await connectToDatabase();
  const formData = await req.formData();
  const file = formData.get("image");
  const title = formData.get("title");

  let imageLink = "";

  if (!title) {
    return NextResponse.json(
      { message: "title are required" },
      { status: 400 }
    );
  }

  try {
    const decoded = jwt.verify(
      cookies().get("Auth-Token").value,
      process.env.JWT_SECRET
    );

    if (file) {
      const base64Data = file.split(",")[1];
      const buffer = Buffer.from(base64Data, "base64");
      const fileType = file.split(";")[0].split(":")[1];
      imageLink = await uploadToS3(file, fileType, buffer, title);
    }

    const post = new Post({
      title,
      imageLink,
      createdBy: decoded.userId,
    });

    await post.save();

    return NextResponse.json({
      message: "Post created successfully",
      status: 201,
      post,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Internal Server Error",
      error: error.message,
      status: 500,
    });
  }
}

export async function GET(req) {
  await connectToDatabase();

  try {
    const decoded = jwt.verify(
      cookies().get("Auth-Token").value,
      process.env.JWT_SECRET
    );

    const posts = await Post.find({ createdBy: decoded.userId });

    return NextResponse.json({
      message: "Posts Found",
      status: 201,
      posts,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Internal Server Error",
      error: error.message,
      status: 500,
    });
  }
}
