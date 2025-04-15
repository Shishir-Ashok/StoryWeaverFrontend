import React from "react";

export default function TocItem({ headingIndex, heading }) {
  const handleClick = (e) => {
    e.preventDefault();
    const targetElement = document.getElementById(heading.id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="toc-item">
      <div className="toc-heading">
        <a href={`#${heading.id}`} onClick={handleClick}>
          {headingIndex}. {heading.text}
        </a>
      </div>

      {/* Render sub-items for links and highlights under this heading */}
      <div className="toc-subitems">
        {heading.links.map((linkText, idx) => (
          <div key={`link-${idx}`} className="toc-subitem">
            {headingIndex}.{idx + 1} {linkText}
          </div>
        ))}
        {heading.highlights.map((highlightText, idx) => {
          const highlightNum = heading.links.length + idx + 1;
          return (
            <div key={`highlight-${idx}`} className="toc-subitem">
              {headingIndex}.{highlightNum} {highlightText}
            </div>
          );
        })}
      </div>
    </div>
  );
}
