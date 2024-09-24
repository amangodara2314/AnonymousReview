"use client";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const MainContext = createContext();

function GlobalContext({ children }) {
  const [posts, setPosts] = useState(null);
  const BASE_URL = process.env.NEXT_PUBLIC_URL_BASE_URL;
  const SIGNUP = process.env.NEXT_PUBLIC_URL_SIGNUP;
  const LOGIN = process.env.NEXT_PUBLIC_URL_LOGIN;
  const POST = process.env.NEXT_PUBLIC_URL_POST;

  const fetchPosts = async () => {
    const response = await fetch(BASE_URL + POST);
    const data = await response.json();
    if (response.status == 200) {
      setPosts(data.posts);
    } else {
      toast.error(data.message);
    }
  };

  const fetchPost = async (id, setPost, setError) => {
    const response = await fetch(BASE_URL + POST + "/" + id);

    const data = await response.json();
    if (data.status == 200) {
      setPost(data.post);
    } else {
      setError(data.message);
    }
  };

  const fetchPostReviews = async (id, setPost, setError) => {
    const response = await fetch(BASE_URL + POST + "/reviews/" + id);

    const data = await response.json();
    if (data.status == 200) {
      setPost(data.post);
    } else {
      setError(data.message);
    }
  };

  const submitReview = async (id, setIsSubmitted, setReview, review) => {
    const response = await fetch(BASE_URL + POST + "/" + id, {
      method: "POST",
      body: JSON.stringify({ review: review }),
    });

    const data = await response.json();
    if (data.status == 200) {
      setIsSubmitted(true);
      setReview("");
      // setTimeout(() => {
      //   setIsSubmitted(false);
      // }, 4000);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <MainContext.Provider
      value={{
        BASE_URL,
        SIGNUP,
        LOGIN,
        POST,
        posts,
        fetchPosts,
        fetchPost,
        submitReview,
        fetchPostReviews,
      }}
    >
      {children}
      <Toaster position="top-center" />
    </MainContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(MainContext);
};
export default GlobalContext;
