import './CreatePost.css'
import Tiptap from '../TipTap/TipTap';
import Header from '../HomePage/Header';
import { useState } from 'react';
import EditorInstance from '../../utils/EditorInstance';

export default function CreatePost() {

    const tagsList = [
        "Technology", "Science", "Business", "Health & Wellness", "Travel", "Food & Cooking",
        "AI & Machine Learning", "Web Development", "Data Science", "Cybersecurity", "Cloud Computing",
        "Productivity", "Mindfulness", "Fitness", "Self-Improvement", "Books & Literature",
        "Movies & TV Shows", "Gaming", "Photography", "Writing & Blogging"
    ];

    const [selectedTags, setSelectedTags] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const toggleTag = (tag) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const handleInputChange = (e) => {
        if (e.target.name === "title") {
        setTitle(e.target.value);
        }
        if (e.target.name === "description"){
            setDescription(e.target.value);
        }
    };

    //TipTap Editor
    const editor = EditorInstance();

    // Prop for getting blog data (Title, tages, description...)
    const blogData = {
        title: title,
        description: description,
        tags: selectedTags
    };

    // console.log("EDITOR : ", editor.getJSON());

    return (
        <>
            <Header editor={editor} blogData={blogData}/>
            <div className="post-headers">
                <input type="text" name="title" id="title" placeholder="Title" className="title" onChange={handleInputChange}/>
                <input type="text" name="description" id="description" placeholder="Description" className="description" onChange={handleInputChange}/>
                {selectedTags.length > 0 && (
                    <div className="selected-tags-list">
                        {selectedTags.map((tag) => (
                            <span
                                key={tag}
                                className="selected-tag"
                                onClick={() => toggleTag(tag)}
                            >
                                {tag} ✖
                            </span>
                        ))}
                    </div>
                )}
                <div className="dropdown">
                    <button className="dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        Select Tags ▼
                    </button>
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            {tagsList.map((tag) => (
                                <div
                                    key={tag}
                                    onClick={() => toggleTag(tag)}
                                    className={`dropdown-item ${selectedTags.includes(tag) ? "selected" : ""}`}
                                >
                                    {tag}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Tiptap editor={editor} blogData={blogData}/>
        </>
    );
}