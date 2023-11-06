import { format } from "date-fns";
import React from "react";
import { Post } from "../../_lib/Post";

interface PostComponentProps {
  post: Post;
}

const PostComponent: React.FC<PostComponentProps> = ({ post }) => {
  return (
    <div className="card max-w-5xl bg-base-100 shadow-xl m-3">
      <div className="card-body">
        <p>
          <strong>Name: </strong>
          {post.from_name}
        </p>
        <p>
          <strong>Message: </strong>
          {post.message}
        </p>
        <p>
          <strong>Time: </strong>
          {format(new Date(post.created_time), "dd.MM.yyyy HH:mm")}
        </p>
      </div>
    </div>
  );
};

export default PostComponent;
