// RenderTipTapContent.jsx
import React from "react";

// Exported helper to generate a heading ID.
// It uses any existing ID in the node attributes; if not, it creates one based on the text.
export function getHeadingId(node, key) {
  const headingText =
    node.content?.map((child) => child.text || "").join("") || "";
  return node.attrs?.id || `heading-${key}-${headingText.replace(/\s+/g, "-")}`;
}

export function renderTiptapContent(editorContent) {
  return editorContent.content.map((node, index) => {
    switch (node.type) {
      case "heading":
        return renderHeading(node, index);
      case "paragraph":
        return renderParagraph(node, index);
      // Add more cases as needed (e.g., images, lists)
      default:
        return null;
    }
  });
}

function renderHeading(node, key) {
  const level = node.attrs?.level || 1;
  const headingId = getHeadingId(node, key);
  const HeadingTag = `h${level}`;

  return (
    <HeadingTag id={headingId} key={key}>
      {node.content?.map((child, idx) => renderTextWithMarks(child, idx))}
    </HeadingTag>
  );
}

function renderParagraph(node, key) {
  // If a paragraph node is empty, return null.
  if (!node.content || node.content.length === 0) return null;
  return (
    <p key={key}>
      {node.content.map((child, idx) => renderTextWithMarks(child, idx))}
    </p>
  );
}

// Renders a text node and wraps it with any marks (e.g., links, highlights, code, italic)
function renderTextWithMarks(child, key) {
  let element = child.text || "";
  (child.marks || []).forEach((mark) => {
    if (mark.type === "link") {
      const href = mark.attrs?.href || "#";
      element = (
        <a
          key={key}
          href={href}
          target={mark.attrs?.target || "_self"}
          rel="noopener noreferrer"
        >
          {element}
        </a>
      );
    } else if (mark.type === "highlight") {
      const highlightColor = mark.attrs?.color || "#fc9083";
      element = (
        <span
          key={key}
          style={{ backgroundColor: highlightColor, padding: "2px 4px" }}
        >
          {element}
        </span>
      );
    } else if (mark.type === "code") {
      element = (
        <code key={key} style={{ backgroundColor: "#f4f4f4" }}>
          {element}
        </code>
      );
    } else if (mark.type === "italic") {
      element = <em key={key}>{element}</em>;
    } else if (mark.type === "bold") {
      element = <strong key={key}>{element}</strong>;
    }
  });
  return <React.Fragment key={key}>{element}</React.Fragment>;
}
