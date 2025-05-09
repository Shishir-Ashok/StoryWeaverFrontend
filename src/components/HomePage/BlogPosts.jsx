import { Edit, Eye } from "lucide-react";
import "./HomePage.css";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";

export default function BlogPosts({ post }) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const [redirect, setRedirect] = useState(false);
  const [historyRedirect, setHistoryRedirect] = useState(false);

  const handleEditClick = () => {
    if (post.isEditing) {
      console.log("Edit mode is already active for this post.");
      return;
    }
    setRedirect(true);
  };

  const handleHistoryClick = () => {
    setHistoryRedirect(true);
  };

  if (redirect) {
    return <Navigate to={`/edit/${post._id}`} />;
  }

  if (historyRedirect) {
    return <Navigate to={`/history/${post._id}`} />;
  }

  return (
    <>
      <div className="blog-container">
        <div className="blog-box">
          <p className="username">{post.createdBy.username}</p>
          <Link to={`/post/${post._id}`}>
            <p className="title">{post.title}</p>
          </Link>
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
              <p className="history" onClick={handleHistoryClick}>
                History
              </p>
              <p
                className="edit"
                onClick={handleEditClick}
                style={
                  post.isEditing
                    ? {
                        color: "#aaa",
                        pointerEvents: "none",
                        cursor: "not-allowed",
                      }
                    : { cursor: "pointer" }
                }
              >
                <Edit />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
