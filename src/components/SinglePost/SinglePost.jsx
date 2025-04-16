import "./SinglePost.css";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { generateHTML } from "@tiptap/core";
import { extensions } from "../../utils/EditorInstance";
import { extractSnapshots } from "../../utils/ExtractSnapshots";
import TocItem from "./TocItem";
import Header from "../HomePage/Header";
import { renderTiptapContent } from "./renderTiptapContent";

export default function SinglePost() {
  const { id } = useParams();

  const [blogData, setBlogData] = useState(null);
  const [tableOfContents, setTableOfContents] = useState([]);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        if (hasFetchedRef.current) return;
        hasFetchedRef.current = true; // Prevent multiple fetches and multiple increments to views counter
        const response = await fetch(`http://localhost:3000/blog/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog data");
        }
        const data = await response.json();
        console.log("Blog Data:", data);
        setBlogData(data);

        const toc = extractSnapshots(data.editor);
        setTableOfContents(toc);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogData();
  }, []);

  const formattedDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Generate HTML from JSON
  if (blogData !== null) {
    console.log("TOC:", tableOfContents);

    console.log("Content: ", blogData.editor);
    return (
      <>
        <Header blogData={blogData} />
        <div className="single-post-container">
          <aside className="toc">
            <h2>Table of Contents</h2>
            {tableOfContents.map((heading, index) => (
              <TocItem
                key={heading.id}
                headingIndex={index + 1}
                heading={heading}
              />
            ))}
          </aside>
          <main className="post-content">
            <h1 className="post-title">{blogData.title}</h1>
            <div className="meta-data">
              <div className="post-creator">
                <p className="post-author">{blogData.createdBy.username}</p>
                <p className="post-author">{blogData.editedBy.username}</p>
              </div>
              <div className="dots">
                <span>{"· "}</span>
                <span>{"· "}</span>
              </div>
              <div className="post-editor">
                <p className="post-time">{formattedDate(blogData.createdAt)}</p>

                <p className="post-time">
                  {formattedDate(blogData.updatedAt)} {"(last edit)"}
                </p>
              </div>
            </div>
            {renderTiptapContent(blogData.editor)}
          </main>
        </div>
      </>
    );
  }
  return <>single blog</>;
}
