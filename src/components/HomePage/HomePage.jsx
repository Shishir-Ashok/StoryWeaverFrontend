import { useEffect, useState } from "react";
import BlogPosts from "./BlogPosts";
import Header from "./Header";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/blogs").then((response) => {
      response.json().then((posts) => {
        console.log(posts);
        setPosts(posts);
      });
    });
  }, []);

  return (
    <>
      <Header />
      <div className="tag-list"></div>
      {posts.length > 0 &&
        posts.map((post) => <BlogPosts key={post._id} post={post} />)}
    </>
  );
}
