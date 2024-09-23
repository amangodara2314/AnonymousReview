"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { AlertCircle, Loader2, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useGlobalContext } from "@/context/GlobalContext";
import { ErrorIcon } from "react-hot-toast";
import DashboardHeader from "./DashboardHeader";

export default function SubmitReview({ id }) {
  const { fetchPost } = useGlobalContext();
  const [review, setReview] = useState("");
  const [post, setPost] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost(id, setPost, setError);
  }, [id]);

  const handleReviewChange = (e) => {
    const input = e.target.value;
    if (input.length <= 300) {
      setReview(input);
    }
  };

  const handleSubmit = () => {
    console.log("Submitting review:", review);
    setIsSubmitted(true);
    setReview("");
  };

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white font-sans p-8 flex-col flex items-center justify-center">
        <div className="flex items-center gap-4 text-2xl">
          <ErrorIcon /> {error}
        </div>
        <span className="mt-4 text-lg">
          Please confirm if the link is valid
        </span>
      </div>
    );
  }
  if (!post) {
    <div className="min-h-screen bg-black text-white font-sans p-8 flex items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>;
  }

  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return (
    <>
      {post && (
        <>
          <DashboardHeader />
          <div className="min-h-screen bg-black text-white font-sans p-8">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-4xl font-bold mb-12 text-center">
                Submit Your Review
              </h1>

              <Card className="bg-zinc-950 border-zinc-800 mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-white">
                    <div className="flex justify-between items-center">
                      {post.title}
                    </div>{" "}
                    <span className="text-zinc-400 font-normal text-sm">
                      Posted by {post.createdBy.username} at{" "}
                      {new Date(post.createdAt).toLocaleString(
                        "en-US",
                        options
                      )}{" "}
                    </span>
                  </CardTitle>
                </CardHeader>
                {post.imageLink != "" && (
                  <CardContent>
                    <div className="relative w-full mb-4">
                      <img
                        src={post.imageLink}
                        alt={post.title}
                        className="rounded-md aspect-video object-cover"
                      />
                    </div>
                  </CardContent>
                )}
              </Card>

              <Card className="bg-zinc-950 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-white">
                    Your Review
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Textarea
                    placeholder="Type your review here..."
                    value={review}
                    onChange={handleReviewChange}
                    className="bg-zinc-900 border-zinc-700 text-gray-300 placeholder-zinc-400 min-h-[150px] resize-none"
                    maxLength={300}
                  />
                  <div className="flex justify-between items-center text-sm">
                    <span
                      className={`${
                        review.length > 280
                          ? "text-yellow-400"
                          : "text-zinc-400"
                      }`}
                    >
                      {review.length}/300 characters
                    </span>
                    {review.length > 280 && (
                      <span className="text-yellow-400 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Approaching limit
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleSubmit}
                    className="w-full bg-white text-black py-2"
                    disabled={review.length === 0 || isSubmitted}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Review
                  </Button>
                </CardFooter>
              </Card>

              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mt-8"
                  >
                    <Card className="bg-green-900 border-green-700">
                      <CardContent className="py-4">
                        <p className="text-center text-green-400">
                          Your review has been submitted successfully. Thank you
                          for your feedback!
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </>
      )}
    </>
  );
}
