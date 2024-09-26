import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Shield, Link as Link2, BarChart } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="bg-zinc-950 py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">AnonymousInsight</h1>
        <nav>
          <Link href="/login" passHref>
            <Button
              variant="ghost"
              className="text-white hover:bg-zinc-800 mr-4"
            >
              Log in
            </Button>
          </Link>
          <Link href="/signup" passHref>
            <Button className="bg-white text-black hover:bg-zinc-200">
              Sign up
            </Button>
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            Collect Anonymous Feedback with Ease
          </h2>
          <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
            ReviewEcho helps you gather honest, unbiased feedback through
            anonymous reviews. Improve your team, product, or service with
            genuine insights.
          </p>
          <Link href="/signup" passHref>
            <Button className="bg-white text-black hover:bg-zinc-200 text-lg py-6 px-8">
              Get Started
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <Shield className="h-12 w-12 mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">
                Anonymous Submissions
              </h3>
              <p className="text-zinc-400">
                Ensure honest feedback with our secure, anonymous review system.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <Link2 className="h-12 w-12 mb-4 text-green-500" />
              <h3 className="text-xl font-semibold mb-2">Easy Sharing</h3>
              <p className="text-zinc-400">
                Share review links effortlessly and collect feedback from
                anyone.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <BarChart className="h-12 w-12 mb-4 text-purple-500" />
              <h3 className="text-xl font-semibold mb-2">
                Insightful Analytics
              </h3>
              <p className="text-zinc-400">
                Gain valuable insights with our comprehensive review analytics.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-8">
            Ready to get valuable feedback?
          </h2>
          <Link href="/signup" passHref>
            <Button className="bg-white text-black hover:bg-zinc-200">
              Create Your Free Account
            </Button>
          </Link>
        </section>
      </main>

      <footer className="bg-zinc-950 py-4 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-center items-center">
          <p className="text-zinc-500">
            &copy; {new Date().getFullYear()} ReviewEcho. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
