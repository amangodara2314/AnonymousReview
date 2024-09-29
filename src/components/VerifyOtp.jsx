"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, RefreshCcw } from "lucide-react";
import Link from "next/link";

const OTPInput = ({ value, onChange, length = 6 }) => {
  const inputRefs = useRef([]);

  const handleChange = (index, e) => {
    const newValue = e.target.value.replace(/[^0-9]/g, "");
    if (newValue.length <= 1) {
      const newOTP = value.split("");
      newOTP[index] = newValue;
      onChange(newOTP.join(""));

      if (newValue.length === 1 && index < length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOTP = value.split("");
      if (newOTP[index]) {
        newOTP[index] = "";
      } else if (index > 0) {
        newOTP[index - 1] = "";
        inputRefs.current[index - 1].focus();
      }
      onChange(newOTP.join(""));
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  return (
    <div className="flex justify-between">
      {Array(length)
        .fill(0)
        .map((_, index) => (
          <Input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[index] || ""}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-12 text-center text-2xl bg-zinc-900 border-2 border-zinc-700 rounded-md focus:border-white focus:outline-none"
          />
        ))}
    </div>
  );
};

export default function VerifyOtp() {
  const [otp, setOTP] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  const handleVerify = async () => {
    setIsVerifying(true);
    setError("");

    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For demonstration, let's assume OTP '123456' is correct
    if (otp === "123456") {
      // Handle successful verification (e.g., redirect to dashboard)
      console.log("OTP verified successfully");
    } else {
      setError("Invalid OTP. Please try again.");
    }

    setIsVerifying(false);
  };

  const handleResend = async () => {
    // Simulating API call to resend OTP
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("OTP resent");
    setCountdown(60); // Start the 60-second countdown
    // You might want to show a success message here
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-zinc-950 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Verify Your Email
          </CardTitle>
          <CardDescription className="text-center text-zinc-400">
            We've sent a 6-digit code to your email. Enter it below to confirm
            your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OTPInput value={otp} onChange={setOTP} length={6} />
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            onClick={handleVerify}
            disabled={otp.length !== 6 || isVerifying}
            className="w-full bg-white text-black hover:bg-zinc-200 transition-colors"
          >
            {isVerifying ? "Verifying..." : "Verify OTP"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <div className="flex justify-between items-center w-full text-sm">
            <Button
              variant="link"
              onClick={handleResend}
              disabled={countdown > 0}
              className="text-zinc-400 hover:text-white p-0 disabled:opacity-50"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              {countdown > 0 ? `Resend OTP (${countdown}s)` : "Resend OTP"}
            </Button>
            <Link href="/login" className="text-zinc-400 hover:text-white">
              Back to Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
