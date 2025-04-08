import { useState, useEffect } from "react";

export default function TagSelector({
  selectedTags: propSelectedTags,
  onTagsChange,
}) {
  const [selectedTags, setSelectedTags] = useState(propSelectedTags || []);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // console.log("TagSelector.jsx selectedTags: ", selectedTags);

  const tagsList = [
    "Technology",
    "Science",
    "Business",
    "Health & Wellness",
    "Travel",
    "Food & Cooking",
    "AI & Machine Learning",
    "Web Development",
    "Data Science",
    "Cybersecurity",
    "Cloud Computing",
    "Productivity",
    "Mindfulness",
    "Fitness",
    "Self-Improvement",
    "Books & Literature",
    "Movies & TV Shows",
    "Gaming",
    "Photography",
    "Writing & Blogging",
  ];

  // Toggle the dropdown menu visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Add or remove a tag from selectedTags state
  const handleTagClick = (tag) => {
    let updatedTags;
    if (selectedTags.includes(tag)) {
      updatedTags = selectedTags.filter((t) => t !== tag);
    } else {
      updatedTags = [...selectedTags, tag];
    }
    setSelectedTags(updatedTags);
    // Notify the parent component about the updated tags.
    onTagsChange(updatedTags);
  };

  useEffect(() => {
    setSelectedTags(propSelectedTags);
  }, [propSelectedTags]);

  return (
    <>
      <div className="tag-selector">
        {/* Dropdown for tag selection */}
        <div className="dropdown-homepage">
          <button className="dropdown-button-homepage" onClick={toggleDropdown}>
            Filter Tags ▼
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu-homepage">
              {tagsList.map((tag) => (
                <div
                  key={tag}
                  className={`dropdown-item-homepage ${
                    selectedTags.includes(tag) ? "selected" : ""
                  }`}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected tags display */}
        <div className="selected-tags-homepage">
          {selectedTags.map((tag) => (
            <div
              key={tag}
              className="selected-tag-homepage"
              onClick={() => handleTagClick(tag)}
            >
              {tag} &times;
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
