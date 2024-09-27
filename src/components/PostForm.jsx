"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image as ImageIcon, X } from "lucide-react";
import toast from "react-hot-toast";

export function PostForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async () => {
    if (!title) {
      toast.error("Title is required");
      return;
    }
    setLoading(true);
    await onSubmit({ title, image });
    setLoading(false);
    setTitle("");
    setImage(null);
  };

  return (
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
          className="bg-black border-zinc-800 text-white"
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
            onClick={() => document.getElementById("image-upload").click()}
            className="w-full text-white h-24"
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
              className="absolute top-2 right-2"
              onClick={() => setImage(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full ${
            loading ? "bg-gray-100" : "bg-white text-black"
          }`}
        >
          {loading ? "Generating Link..." : "Generate Link"}
        </Button>
      </CardContent>
    </Card>
  );
}
