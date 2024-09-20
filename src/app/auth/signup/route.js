// app/api/auth/signup/route.js

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/db";
import User from "@/lib/models/User";

export async function POST(req) {
  try {
    await connectToDatabase();

    const { username, email, password } = await req.json();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 400,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    return new Response(
      JSON.stringify({ message: "User created successfully", token }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Signup failed" }), {
      status: 500,
    });
  }
}
