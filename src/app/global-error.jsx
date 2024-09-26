"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function GlobalError({ error, reset }) {
  const [errorMessage, setErrorMessage] = useState(
    "An unexpected error occurred"
  );

  useEffect(() => {
    // Set a more specific error message if available
    if (error.message) {
      setErrorMessage(error.message);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md w-full">
        <div className="mb-8 relative">
          <div className="text-9xl font-bold text-zinc-800 opacity-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Error
          </div>
          <div className="relative z-10">
            <svg
              className="w-32 h-32 mx-auto text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-4">
          Oops! Something went wrong
        </h2>
        <p className="text-zinc-400 mb-8">{errorMessage}</p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button
            onClick={() => reset()}
            className="bg-white text-black hover:bg-zinc-200 transition-colors"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Link href="/" passHref>
            <Button className="bg-zinc-800 text-white hover:bg-zinc-700 transition-colors">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-16 text-zinc-600 text-sm">
        <p>
          &copy; {new Date().getFullYear()} ReviewEcho. All rights reserved.
        </p>
      </div>
    </div>
  );
}
