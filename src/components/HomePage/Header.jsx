import { useContext, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import AuthContext from "../../utils/AuthContext";
import "./HomePage.css";

export default function Header({ editor, blogData }) {
  const location = useLocation();
  const isCreatePage = location.pathname === "/create";

  // Go to home page
  const [isHome, setIsHome] = useState(false);

  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };

  const handlePublish = async () => {
    console.log("Header editor: ", editor.getJSON());
    console.log("\nBLOG DATA: ", blogData);

    const editorString = JSON.stringify(editor.getJSON());

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
  };

  if (isHome) {
    return <Navigate to={"/home"} />;
  }

  return (
    <>
      <header className="header-container">
        <Link to={"/home"} className="logo">
          SW
        </Link>
        <div className="header-elements">
          {isCreatePage ? (
            <p className="create-post" onClick={handlePublish} id="publish">
              Publish
            </p>
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
