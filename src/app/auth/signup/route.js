import { connectToDatabase } from "@/utils/database";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { sendOtp } from "@/utils/mailer";

export async function POST(req) {
  try {
    await connectToDatabase();

    const { username, email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        {
          status: 400,
        }
      );
    }

    const res = await sendOtp(email);
    if (!res.success) {
      return NextResponse.json(
        { message: "Error Sending Verification Mail." },
        { status: 500 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      otp: res.otp,
      otpExpiresAt: new Date(new Date().getTime() + 5 * 60000),
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 301 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Signup failed" },
      {
        status: 500,
      }
    );
  }
}
