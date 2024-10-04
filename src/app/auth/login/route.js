import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/utils/database";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import { sendOtp } from "@/utils/mailer";

export async function POST(req) {
  try {
    await connectToDatabase();

    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        {
          status: 400,
        }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        {
          status: 400,
        }
      );
    }
    if (user.isVerified) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      cookies().set("Auth-Token", token);

      return new Response(JSON.stringify({ message: "Login successful" }), {
        status: 200,
      });
    } else {
      const res = await sendOtp(email);
      if (!res.success) {
        return NextResponse.json(
          { message: "Error Sending Verification Mail." },
          { status: 500 }
        );
      }
      user.otp = res.otp;
      user.otpExpiresAt = new Date(new Date().getTime() + 5 * 60000);
      await user.save();
      return NextResponse.json(
        { message: "User created successfully" },
        { status: 301 }
      );
    }
  } catch (error) {
    console.log("error:", error.message);
    return new Response(JSON.stringify({ message: "Login failed" }), {
      status: 500,
    });
  }
}
