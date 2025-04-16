import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import CreatePost from "../CreatePost/CreatePost";

export default function EditPostPage() {
  const [blogData, setBlogData] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/edit/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog data");
        }
        const data = await response.json();
        console.log("Edit page Blog Data:", data);
        setBlogData(data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogData();
  }, []);

  useEffect(() => {
    return () => {
      console.log("Cleaning up editing state...");
      // Reset the editing state on the server
      fetch(`http://localhost:3000/editCleanup/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((error) =>
        console.error("Error cleaning up editing state:", error)
      );
    };
  }, [id]);

  return (
    <>
      <CreatePost initialData={blogData} />
    </>
  );
}
