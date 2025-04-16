import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";

export const extensions = [
  StarterKit,
  Highlight.configure({ multicolor: true }),
  Placeholder.configure({
    placeholder: "Tell your story...",
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: "https",
    protocols: ["http", "https"],
    isAllowedUri: (url, ctx) => {
      try {
        // construct URL
        const parsedUrl = url.includes(":")
          ? new URL(url)
          : new URL(`${ctx.defaultProtocol}://${url}`);

        // use default validation
        if (!ctx.defaultValidate(parsedUrl.href)) {
          return false;
        }

        // disallowed protocols
        const disallowedProtocols = ["ftp", "file", "mailto"];
        const protocol = parsedUrl.protocol.replace(":", "");

        if (disallowedProtocols.includes(protocol)) {
          return false;
        }

        // only allow protocols specified in ctx.protocols
        const allowedProtocols = ctx.protocols.map((p) =>
          typeof p === "string" ? p : p.scheme
        );

        if (!allowedProtocols.includes(protocol)) {
          return false;
        }

        // disallowed domains
        const disallowedDomains = [
          "example-phishing.com",
          "malicious-site.net",
        ];
        const domain = parsedUrl.hostname;

        if (disallowedDomains.includes(domain)) {
          return false;
        }

        // all checks have passed
        return true;
      } catch {
        return false;
      }
    },
    shouldAutoLink: (url) => {
      try {
        // construct URL
        const parsedUrl = url.includes(":")
          ? new URL(url)
          : new URL(`https://${url}`);

        // only auto-link if the domain is not in the disallowed list
        const disallowedDomains = [
          "example-no-autolink.com",
          "another-no-autolink.com",
        ];
        const domain = parsedUrl.hostname;

        return !disallowedDomains.includes(domain);
      } catch {
        return false;
      }
    },
  }),
];

export default function EditorInstance(initialContent = null) {
  //   const content = {
  //     type: "doc",
  //     content: [
  //       {
  //         type: "heading",
  //         attrs: {
  //           level: 1,
  //         },
  //         content: [
  //           {
  //             type: "text",
  //             text: "This is a test",
  //           },
  //         ],
  //       },
  //       {
  //         type: "paragraph",
  //         content: [
  //           {
  //             type: "text",
  //             marks: [
  //               {
  //                 type: "bold",
  //               },
  //             ],
  //             text: "import ",
  //           },
  //           {
  //             type: "text",
  //             text: "{ useEditor } ",
  //           },
  //           {
  //             type: "text",
  //             marks: [
  //               {
  //                 type: "italic",
  //               },
  //             ],
  //             text: "from ",
  //           },
  //           {
  //             type: "text",
  //             text: "'@tiptap/react'",
  //           },
  //         ],
  //       },
  //       {
  //         type: "paragraph",
  //         content: [
  //           {
  //             type: "text",
  //             text: "import StarterKit from ",
  //           },
  //           {
  //             type: "text",
  //             marks: [
  //               {
  //                 type: "highlight",
  //                 attrs: {
  //                   color: "#fc9083",
  //                 },
  //               },
  //             ],
  //             text: "'@tiptap/starter-kit'",
  //           },
  //         ],
  //       },
  //       {
  //         type: "paragraph",
  //         content: [
  //           {
  //             type: "text",
  //             text: "import Highlight ",
  //           },
  //           {
  //             type: "text",
  //             marks: [
  //               {
  //                 type: "link",
  //                 attrs: {
  //                   href: "local",
  //                   target: "_blank",
  //                   rel: "noopener noreferrer nofollow",
  //                   class: null,
  //                 },
  //               },
  //             ],
  //             text: "from ",
  //           },
  //           {
  //             type: "text",
  //             text: "'@tiptap/extension-highlight';",
  //           },
  //         ],
  //       },
  //       {
  //         type: "bulletList",
  //         content: [
  //           {
  //             type: "listItem",
  //             content: [
  //               {
  //                 type: "paragraph",
  //                 content: [
  //                   {
  //                     type: "text",
  //                     text: "import Link from '@tiptap/extension-link';",
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         type: "orderedList",
  //         attrs: {
  //           start: 1,
  //           type: null,
  //         },
  //         content: [
  //           {
  //             type: "listItem",
  //             content: [
  //               {
  //                 type: "paragraph",
  //                 content: [
  //                   {
  //                     type: "text",
  //                     text: "import Placeholder from '@tiptap/extension-placeholder';",
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   };

  console.log("EditorInstance.jsx \nContent: ", initialContent);

  const editor = useEditor({
    extensions,
    content: initialContent || null,
    editorProps: {
      attributes: {
        class: "editor-style",
      },
    },
  });

  useEffect(() => {
    if (editor && initialContent) {
      // Use setContent to update the editor with the passed-in content
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);

  return editor;
}
