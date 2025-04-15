export const extractSnapshots = (editorContent) => {
  const toc = [];
  let currentHeading = null;
  console.log("Editor Content: ", editorContent);

  editorContent.content.forEach((node, index) => {
    // Check if the node is a heading
    if (node.type === "heading") {
      const headingText =
        node.content
          ?.map((child) => child.text)
          .join("")
          .trim() || "";

      if (headingText !== "") {
        const level = node.attrs?.level || 1;
        const headingId = `heading-${index}-${headingText.replace(
          /\s+/g,
          "-"
        )}`;

        // Create a unique ID for the heading
        // const headingId = `heading-${index}-${headingText.replace(/\s+/g, "-")}`;
        currentHeading = {
          id: headingId,
          text: headingText,
          level: node.attrs?.level || 1,
          links: [],
          highlights: [],
        };
        toc.push(currentHeading);
      }
    } else {
      // For non-heading nodes (like paragraphs), check for links and highlights
      if (currentHeading && node.content) {
        node.content.forEach((child) => {
          const textValue = child.text || "";
          const marks = child.marks || [];
          console.log("Text Value: ", textValue);
          marks.forEach((mark) => {
            if (mark.type === "link") {
              currentHeading.links.push(textValue);
            }
            if (mark.type === "highlight") {
              currentHeading.highlights.push(textValue);
            }
          });
        });
      }
    }
  });

  return toc;
};
