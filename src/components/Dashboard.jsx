"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Link as LinkIcon,
  Copy,
  Image as ImageIcon,
  X,
  LogOut,
} from "lucide-react";
import { useGlobalContext } from "@/context/GlobalContext";
import toast from "react-hot-toast";

export default function Dashboard() {
  const { BASE_URL, POST } = useGlobalContext();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [generatedLink, setGeneratedLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [previousPosts, setPreviousPosts] = useState([
    { id: 1, title: "Team Feedback", link: "https://reviewecho.com/r/abc123" },
    {
      id: 2,
      title: "Project Evaluation",
      link: "https://reviewecho.com/r/def456",
    },
    {
      id: 3,
      title: "Customer Satisfaction Survey",
      link: "https://reviewecho.com/r/ghi789",
    },
  ]);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateLink = async () => {
    if (!title) {
      toast.error("Title is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);

    if (image) {
      formData.append("image", image);
    }
    setLoading(true);
    try {
      const response = await fetch(BASE_URL + POST, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.status == 200) {
        const newLink = `${BASE_URL}/${data.post._id}`;
        setGeneratedLink(newLink);
        setTitle("");
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copyLink = (link) => {
    navigator.clipboard.writeText(link);
  };

  return (
    <div className="bg-black text-white font-sans">
      <main className="p-8">
        <div className="max-w-full mx-auto">
          <h2 className="text-3xl lg:text-5xl font-bold mb-8 text-center">
            Create a new post and start getting reviews
          </h2>

          <div className="grid grid-cols-1 gap-8 place-items-center">
            <Card className="bg-zinc-950 border-zinc-800 w-full sm:w-[80%] lg:w-1/2">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-white">
                  Generate New Review Link
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  type="text"
                  placeholder="Enter review title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-black border-zinc-800 text-white placeholder-zinc-500 focus:border-white focus:ring-white"
                />
                <div className="flex items-center">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <Button
                    variant="outline"
                    onClick={() =>
                      document.getElementById("image-upload").click()
                    }
                    className="w-full text-white h-24 border-zinc-800 hover:bg-zinc-900 hover:text-white"
                  >
                    <ImageIcon className="mr-2 h-4 w-4" />
                    {image ? "Change Image" : "Upload Image"}
                  </Button>
                </div>
                {image && (
                  <div className="relative">
                    <img
                      src={image}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white"
                      onClick={() => setImage(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <Button
                  onClick={generateLink}
                  disabled={loading}
                  className={`w-full bg-white ${
                    loading ? "text-gray-800" : "text-black"
                  } hover:bg-zinc-200 transition-colors`}
                >
                  {loading ? "Generating Link..." : "Generate Link"}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-zinc-950 border-zinc-800 w-full sm:w-[80%] lg:w-1/2 text-white">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  Previous Posts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {previousPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-4 bg-black rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium">{post.title}</h3>
                      <p className="text-sm text-zinc-400">{post.link}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyLink(post.link)}
                      className="text-white hover:bg-zinc-900 transition-colors"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {generatedLink && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-8 mx-auto block bg-white text-black hover:bg-zinc-200 transition-colors">
                  <LinkIcon className="mr-2 h-4 w-4" />
                  View Generated Link
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-zinc-950 border-zinc-800">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold text-white">
                    Your Generated Link
                  </DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-x-4 mt-4">
                  <Input
                    readOnly
                    value={generatedLink}
                    className="bg-black border-zinc-800 text-white"
                  />
                  <Button
                    onClick={() => copyLink(generatedLink)}
                    variant="outline"
                    size="icon"
                    className="text-white border-zinc-800 hover:bg-zinc-900 transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </main>
    </div>
  );
}
