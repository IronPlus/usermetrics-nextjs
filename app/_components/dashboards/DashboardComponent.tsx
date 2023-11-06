"use client";

import React from "react";
import { Dashboard } from "../../_lib/Dashboard";
import PostsChartComponent from "./PostsChartComponent";

interface DashboardComponentProps {
  dashboard: Dashboard;
}

const DashboardComponent: React.FC<DashboardComponentProps> = ({
  dashboard,
}) => {
  return (
    <div className="card max-w-5xl bg-base-100 shadow-xl m-3">
      <div className="card-body">
        <h3 className="card-title">{dashboard.name}</h3>
        <p>
          <strong>The total number of posts made: </strong>
          {dashboard.total_posts}
        </p>
        <p>
          <strong>The median number of characters of posts: </strong>
          {dashboard.median_num_of_chars}
        </p>
        <div>
          <strong>The graph illustrating the monthly post count:</strong>
          <PostsChartComponent stats={dashboard.monthly_posts_statistics} />
        </div>
        <p>
          <strong>The longest post: </strong>
          {dashboard.longest_post}
        </p>
      </div>
    </div>
  );
};

export default DashboardComponent;
