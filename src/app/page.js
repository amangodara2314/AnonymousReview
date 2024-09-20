"use client";

import { useState } from "react";
import { Eye, Send, Lock, LogIn, UserPlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function LandingPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#121212] border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-cyan-400">ReviewEcho</div>
          <nav className="space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              FAQ
            </a>
          </nav>
        </div>
      </header>

      <main className="pt-32 pb-20 px-4">
        <section className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Give or take anonymous reviews
            <br />
            with just a link
          </h1>
          <p className="text-xl mb-12 text-gray-400 max-w-2xl mx-auto">
            Simple, secure, and straightforward. No public feeds, just honest
            feedback.
          </p>
          <div className="flex justify-center space-x-4">
            <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-cyan-600 text-white hover:bg-cyan-700 transition-all duration-300"
                >
                  Request a Review
                  <Eye className="ml-2" size={20} />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#1E1E1E] border-gray-700">
                <DialogHeader>
                  <DialogTitle>Log in or Sign up</DialogTitle>
                </DialogHeader>
                <LoginForm onClose={() => setIsLoginModalOpen(false)} />
              </DialogContent>
            </Dialog>
            <Dialog
              open={isSubmitModalOpen}
              onOpenChange={setIsSubmitModalOpen}
            >
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300"
                >
                  Submit a Review
                  <Send className="ml-2" size={20} />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#1E1E1E] border-gray-700">
                <DialogHeader>
                  <DialogTitle>Submit Anonymous Review</DialogTitle>
                </DialogHeader>
                <SubmitReviewForm onClose={() => setIsSubmitModalOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </section>

        <section className="mt-20">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">
              How it works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<UserPlus size={24} />}
                title="Request Reviews"
                description="Sign up, generate a unique link, and share it to receive anonymous feedback."
              />
              <FeatureCard
                icon={<Send size={24} />}
                title="Submit Reviews"
                description="Use the unique link to submit anonymous reviews without logging in."
              />
              <FeatureCard
                icon={<Lock size={24} />}
                title="Private Feedback"
                description="Only you can access the reviews through your secure dashboard."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2023 ReviewEcho. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-[#1E1E1E] p-6 rounded-lg text-center">
      <div className="text-cyan-400 mb-4 flex justify-center">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}

function LoginForm({ onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <Input
        type="email"
        placeholder="Email"
        className="bg-[#2A2A2A] border-gray-700 text-white"
      />
      <Input
        type="password"
        placeholder="Password"
        className="bg-[#2A2A2A] border-gray-700 text-white"
      />
      {isSignUp && (
        <Input
          type="password"
          placeholder="Confirm Password"
          className="bg-[#2A2A2A] border-gray-700 text-white"
        />
      )}
      <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700">
        {isSignUp ? "Sign Up" : "Log In"}
      </Button>
      <div className="text-center">
        <button
          type="button"
          className="text-cyan-400 hover:underline"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp
            ? "Already have an account? Log in"
            : "Need an account? Sign up"}
        </button>
      </div>
    </form>
  );
}

function SubmitReviewForm({ onClose }) {
  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <Textarea
        placeholder="Type your anonymous review here..."
        className="bg-[#2A2A2A] border-gray-700 text-white min-h-[150px]"
      />
      <Button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700"
      >
        Submit Anonymous Review
      </Button>
    </form>
  );
}
