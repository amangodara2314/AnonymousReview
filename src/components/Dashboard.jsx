"use client";

import { useEffect, useState } from "react";
import { PostForm } from "./PostForm";
import { PostList } from "./PostList";
import { GeneratedLinkDialog } from "./GeneratedLinkDialog";
import { useGlobalContext } from "@/context/GlobalContext";
import toast from "react-hot-toast";

export default function Dashboard() {
  const { BASE_URL, POST, posts, fetchPosts, isActive } = useGlobalContext();
  const [generatedLink, setGeneratedLink] = useState("");
  const [coppied, setCoppied] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const generateLink = async ({ title, image }) => {
    const formData = new FormData();
    formData.append("title", title);
    if (image) formData.append("image", image);

    try {
      const response = await fetch(BASE_URL + POST, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.status === 200) {
        setGeneratedLink(`${BASE_URL}/${data.post._id}`);
        fetchPosts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const copyLink = (link) => {
    setCoppied(link);
    navigator.clipboard.writeText(link);
    setTimeout(() => setCoppied(""), 2000);
  };

  return (
    <div className="bg-black text-white font-sans">
      <main className="p-8">
        <div className="max-w-full mx-auto">
          <h2 className="text-3xl lg:text-5xl font-bold mb-8 text-center">
            Create a new post and start getting reviews
          </h2>
          <div className="grid grid-cols-1 gap-8 place-items-center">
            <PostForm onSubmit={generateLink} />
            <PostList
              posts={posts}
              BASE_URL={BASE_URL}
              coppied={coppied}
              copyLink={copyLink}
              isActive={isActive}
            />
          </div>
          <GeneratedLinkDialog
            generatedLink={generatedLink}
            coppied={coppied}
            copyLink={copyLink}
            setGeneratedLink={setGeneratedLink}
          />
        </div>
      </main>
    </div>
  );
}
