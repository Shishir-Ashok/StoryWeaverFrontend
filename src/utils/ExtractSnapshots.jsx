export default function extractSnapshots(doc) {
  const snapshots = [];
  
  function traverse(node) {
    if (node.type === 'text') {
      // If the node has marks, check each one
      if (node.marks && Array.isArray(node.marks)) {
        node.marks.forEach(mark => {
          if (mark.type === 'highlight') {
            // Save the highlighted text
            snapshots.push({
              type: 'highlight',
              text: node.text,
            });
          }
          if (mark.type === 'link') {
            // Save the link details
            snapshots.push({
              type: 'link',
              text: node.text,
              href: mark.attrs.href,
            });
          }
        });
      }
    }
    
    // If there are child nodes, traverse them too.
    if (node.content && Array.isArray(node.content)) {
      node.content.forEach(child => traverse(child));
    }
  }
  
  traverse(doc);
  return snapshots;
}