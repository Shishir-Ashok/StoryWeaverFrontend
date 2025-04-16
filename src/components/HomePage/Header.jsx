import { useContext, useState, useEffect } from "react";
import {
  Link,
  Navigate,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import AuthContext from "../../utils/AuthContext";
import "./HomePage.css";

export default function Header({ editor, blogData }) {
  const location = useLocation();
  const isCreatePage = location.pathname === "/create";
  const isSinglePostPage = useMatch("/post/:id") !== null;
  const isEditPage = useMatch("/edit/:id") !== null;

  const [editRedirect, setEditRedirect] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const [postId, setPostId] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const params = useParams();

  console.log("HEADER BLOG DATA: ", blogData);

  //avoid re-rendering the component when the user is on the single post page
  useEffect(() => {
    if (isSinglePostPage && params.id) {
      setPostId(params.id);
      setIsEditing(blogData.isEditing);
      console.log("HEADER PARAMS: ", params.id);
    }
  }, [isSinglePostPage, params.id]);

  console.log("IsSinglePostPage: ", isSinglePostPage);
  console.log("Header location: ", location.pathname);

  const { logout, userInfo } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };

  const handlePublish = async () => {
    console.log("Header editor: ", editor.getJSON());
    console.log("\nBLOG DATA: ", blogData);

    const editorString = JSON.stringify(editor.getJSON());

    if (isCreatePage) {
      const data = {
        title: blogData.title,
        description: blogData.description,
        tags: blogData.tags,
        editor: editorString,
      };

      console.log("STRINGIFY", JSON.stringify(data));

      console.log("FORM DATA: ", data);
      console.log("PARSE TAG: ", blogData.tags);

      const response = await fetch("http://localhost:3000/publish", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (response.ok) {
        setIsHome(true);
      }
    }

    // If the user is on the edit page, we need to send the data to the server
    // to update the blog post
    if (isEditPage) {
      const data = {
        title: blogData.title,
        description: blogData.description,
        tags: blogData.tags,
        editor: editorString,
      };

      console.log("STRINGIFY", JSON.stringify(data));

      console.log("FORM DATA: ", data);
      console.log("PARSE TAG: ", blogData.tags);

      const response = await fetch(
        `http://localhost:3000/publishEdit/${params.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );

      if (response.ok) {
        // console.log("EDIT RESPONSE: ", data);
        setEditRedirect(true);
      }
    }
  };

  if (isHome) {
    return <Navigate to={"/home"} />;
  }

  if (editRedirect) {
    return <Navigate to={`/post/${params.id}`} />;
  }

  return (
    <>
      <header className="header-container">
        <Link to={"/home"} className="logo">
          SW
        </Link>
        <div className="header-elements">
          {isCreatePage || isEditPage ? (
            <p className="create-post" onClick={handlePublish} id="publish">
              Publish
            </p>
          ) : isSinglePostPage && !isEditing ? (
            <Link className="create-post" to={`/edit/${postId}`} id="edit">
              Edit
            </Link>
          ) : isSinglePostPage && isEditing ? (
            <p className={"create-post handleEdit"}>Edit</p>
          ) : (
            <Link className="create-post" to={"/create"} id="create">
              Create
            </Link>
          )}
          <Link className="logout" onClick={handleLogout}>
            Logout
          </Link>
        </div>
      </header>
    </>
  );
}
