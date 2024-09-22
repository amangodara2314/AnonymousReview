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

const handler = connectToDatabase()
  .upload.single("image") // Use multer middleware for handling an array of images
  .post(async (req, res) => {
    const decoded = jwt.verify(
      cookies().get("Auth-Token").value,
      process.env.JWT_SECRET
    );
    console.log(req.body);

    const { title } = req.body;
    let imageLink = "";

    try {
      if (req.file) {
        imageLink = await uploadToS3(req.file);
      }

      const post = new Post({
        title,
        imageLink,
        createdBy: decoded.userId,
      });

      await post.save();

      return NextResponse.json({
        msg: "Post created successfully",
        status: 201,
        post,
      });
    } catch (error) {
      console.log(error);
      return NextResponse.json({
        msg: "Internal Server Error",
        error: error.message,
        status: 500,
      });
    }
  });

export default handler;
