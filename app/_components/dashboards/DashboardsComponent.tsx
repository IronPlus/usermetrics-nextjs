"use client";

import React, { useEffect, useState } from "react";
import { Dashboard } from "../../_lib/Dashboard";
import { Post, UserPosts } from "../../_lib/Post";
import DashboardComponent from "./DashboardComponent";

const DashboardsComponent: React.FC = () => {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getDashboards = async (): Promise<void> => {
    const userPostsArray: UserPosts[] = [];
    const userIds: string[] = [];

    try {
      const res = await fetch("/posts.json");

      if (!res.ok) {
        throw new Error(`Http error when fetching posts: ${res.status}`);
      }

      const posts = await res.json();

      posts.forEach((post: Post) => {
        if (!userIds.includes(post.from_id)) {
          userIds.push(post.from_id);
          userPostsArray.push({
            user_id: post.from_id,
            name: post.from_name,
            posts: [],
          });
        }

        userPostsArray.forEach((userPosts) => {
          if (userPosts.user_id === post.from_id) {
            userPosts.posts.push(post);
          }
        });
      });

      const dashboards = createDashboards(userPostsArray);

      setDashboards(dashboards);
    } catch (error) {
      console.error(`Could not fetch posts, error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDashboards();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg scale-150"></span>
      </div>
    );
  }

  return (
    <div className="grid justify-center">
      <div className="p-5 font-bold text-xl">All dashboards:</div>
      {dashboards.map((dashboard) => (
        <DashboardComponent key={dashboard.user_id} dashboard={dashboard} />
      ))}
    </div>
  );
};

function createDashboards(userPostsArray: UserPosts[]): Dashboard[] {
  const dashboards: Dashboard[] = [];

  userPostsArray.forEach((userPosts) => {
    dashboards.push({
      user_id: userPosts.user_id,
      name: userPosts.name,
      total_posts: userPosts.posts.length,
      median_num_of_chars: findMedian(userPosts),
      monthly_posts_statistics: createMonthlyPostsStatistics(userPosts),
      longest_post: findLongestPost(userPosts),
    });
  });

  return dashboards;
}

function findMedian(userPosts: UserPosts): number {
  let lengths: number[] = [];

  userPosts.posts.forEach((post) => {
    lengths.push(post.message.trim().length);
  });

  lengths = lengths.sort((a, b) => a - b);

  const mid = Math.floor(lengths.length / 2);

  return lengths.length % 2 === 0
    ? (lengths[mid - 1] + lengths[mid]) / 2
    : lengths[mid];
}

function createMonthlyPostsStatistics(userPosts: UserPosts): number[] {
  const statistics = new Array(12).fill(0);

  userPosts.posts.forEach(
    ({ created_time }) => (statistics[new Date(created_time).getMonth()] += 1)
  );

  return statistics;
}

function findLongestPost(userPosts: UserPosts): string {
  const lengths: number[] = [];

  userPosts.posts.forEach((post) => {
    lengths.push(post.message.length);
  });

  const longest = Math.max(...lengths);
  const index = lengths.findIndex((length) => length === longest);

  return userPosts.posts[index].message;
}

export default DashboardsComponent;
