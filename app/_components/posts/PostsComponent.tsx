"use client";

import React, { useEffect, useState } from "react";
import { Post } from "../../_lib/Post";
import Pagination from "../pagination/Pagination";
import PostComponent from "./PostComponent";

const PostsComponent: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 5;

  const getPosts = async (): Promise<void> => {
    try {
      const res = await fetch("/posts.json");

      if (!res.ok) {
        throw new Error(`Http error when fetching posts: ${res.status}`);
      }

      const posts = await res.json();

      setPosts(posts);
    } catch (error) {
      console.error(`Could not fetch posts, error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const displayedPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg scale-150"></span>
      </div>
    );
  }

  return (
    <div className="grid justify-center">
      <div className="p-5 font-bold text-xl flex justify-between">
        <span>All posts:</span>
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
      {displayedPosts.map((post) => (
        <div key={post.id}>
          <PostComponent post={post} />
        </div>
      ))}
    </div>
  );
};

export default PostsComponent;
