"use server";
import User from "@/models/user.model";
import { connectToDatabase } from "./database";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const confirmOtp = async (email, otp) => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ email: email });
    const currentTime = new Date();
    if (!user) {
      throw new Error("Error: Please Try Again Later");
    }
    console.log(otp, user);
    if (currentTime > user.otpExpiresAt) {
      throw new Error("Otp Expired.");
    } else {
      if (otp == user.otp) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        cookies().set("Auth-Token", token);
        user.isVerified = true;
        await user.save();
        return true;
      }
      throw new Error("Invalid Otp.");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
