import { Edit, Eye } from "lucide-react";
import "./HomePage.css";

export default function BlogPosts({ post }) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <div className="blog-container">
        <div className="blog-box">
          <p className="username">{post.createdBy.username}</p>
          <p className="title">{post.title}</p>
          <p className="blog-description">{post.description}</p>
          <div className="blog-footer">
            <div className="flex-group-1">
              <p className="date">{formattedDate}</p>
              <p className="views">
                <Eye />
                <span>{post.views}</span>
              </p>
            </div>
            <div className="flex-group-2">
              <p className="history">History</p>
              <p className="edit">
                <Edit />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
