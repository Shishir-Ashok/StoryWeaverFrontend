import { useEffect, useState } from "react";
import BlogPosts from "./BlogPosts";
import Header from "./Header";
import TagSelector from "./TagSelector";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  const handleTagsChange = (tags) => {
    setSelectedTags(tags);
  };

  // console.log("HomePage.jsx selectedTags: ", selectedTags);

  useEffect(() => {
    fetch("http://localhost:3000/blogs").then((response) => {
      response.json().then((posts) => {
        console.log(posts);
        setAllPosts(posts);
        setPosts(posts);
      });
    });
  }, []);

  useEffect(() => {
    const filteredPosts = allPosts.filter((post) => {
      if (selectedTags.length === 0) return []; // If no tags are selected, show all posts
      return post.tags.some((tag) => selectedTags.includes(tag));
    });
    setPosts(filteredPosts);
  }, [selectedTags]);

  return (
    <>
      <Header />
      <TagSelector
        selectedTags={selectedTags}
        onTagsChange={handleTagsChange}
      />
      {posts.length > 0 ? (
        posts.map((post) => <BlogPosts key={post._id} post={post} />)
      ) : (
        <p className="no-blog">No blogs under the selected tags</p>
      )}
    </>
  );
}
