"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Clock, Loader2 } from "lucide-react";
import Link from "next/link";
import { useGlobalContext } from "@/context/GlobalContext";
import { ErrorIcon } from "react-hot-toast";

const postData = {
  id: "1",
  title: "Team Collaboration Strategies",
  reviews: [
    {
      id: 1,
      text: "Great insights on improving team communication!",
      createdAt: "2023-06-15T10:30:00Z",
    },
    {
      id: 2,
      text: "The strategies mentioned have really helped our team productivity.",
      createdAt: "2023-06-16T14:45:00Z",
    },
    {
      id: 3,
      text: "I'd love to see more specific examples in future posts.",
      createdAt: "2023-06-17T09:15:00Z",
    },
    {
      id: 4,
      text: "This post addresses some key issues we've been facing. Thank you!",
      createdAt: "2023-06-18T11:20:00Z",
    },
  ],
};

export default function PostReviews({ id }) {
  const { fetchPostReviews } = useGlobalContext();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPostReviews(id, setPost, setError);
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white font-sans p-8 flex-col flex items-center justify-center">
        <div className="flex items-center gap-4 text-2xl">
          <ErrorIcon /> {error}
        </div>
        <span className="mt-4 text-lg">Something went wrong...</span>
      </div>
    );
  }
  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white font-sans p-8 flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    post && (
      <div className="min-h-screen bg-black text-white font-sans">
        <main className="p-8">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-zinc-950 border-zinc-800 mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-white">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400">
                  Total Reviews: {post.reviews.length}
                </p>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {post.reviews.map((review) => (
                <Card key={review._id} className="bg-zinc-950 border-zinc-800">
                  <CardContent className="pt-6">
                    <p className="text-white mb-4">{review.text}</p>
                    <div className="flex items-center text-zinc-400 text-sm">
                      <Clock className="h-4 w-4 mr-2" />
                      {formatDate(review.createdAt)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  );
}
