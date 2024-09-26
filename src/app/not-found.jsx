import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-zinc-800">404</h1>
        <div className="mt-4 mb-8">
          <h2 className="text-4xl font-semibold mb-2">Page Not Found</h2>
          <p className="text-zinc-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <Link href="/" passHref>
          <Button className="bg-white text-black hover:bg-zinc-200 transition-colors">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
      <div className="mt-16 text-zinc-600 text-sm">
        <p>
          &copy; {new Date().getFullYear()} ReviewEcho. All rights reserved.
        </p>
      </div>
    </div>
  );
}
