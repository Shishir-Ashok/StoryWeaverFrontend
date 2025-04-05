import {
    Bold,
    Heading1,
    Highlighter,
    Italic,
    Link,
    List,
    ListOrdered,
} from "lucide-react";
import './TipTap.css';
import { useCallback } from "react";





export default function MenuBar({ editor }) {
    if (!editor) {
        return null;
    }


    // For each button, we have a set functionality defined in const Options
    const ToggleButton = ({ pressed, onClick, children }) => (
        <button
            type="button"
            className={`toggle-button ${pressed}`}
            onClick={onClick}
        >
            {children}
        </button>
    );

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        // cancelled
        if (url === null) {
            return
        }

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink()
                .run()

            return
        }

        // update link
        try {
            editor.chain().focus().extendMarkRange('link').setLink({ href: url })
                .run()
        } catch (e) {
            alert(e.message)
        }
    }, [editor])

    const Options = [
        {
            icon: <Heading1 className="icon-size" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            pressed: editor.isActive("heading", { level: 1 }) ? "is-active" : "",
        },
        {
            icon: <Bold className="icon-size" />,
            onClick: () => editor.chain().focus().toggleBold().run(),
            pressed: editor.isActive("bold") ? "is-active" : "",
        },
        {
            icon: <Italic className="icon-size" />,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            pressed: editor.isActive("italic") ? "is-active" : "",
        },
        {
            icon: <Highlighter className="icon-size" />,
            onClick: () => editor.chain().focus().toggleHighlight({ color: "#fc9083" }).run(),
            pressed: editor.isActive("highlight", { color: "#fc9083" }) ? "is-active" : "",
        },
        {
            icon: <ListOrdered className="icon-size" />,
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            pressed: editor.isActive("orderedList") ? "is-active" : "",
        },
        {
            icon: <List className="icon-size" />,
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            pressed: editor.isActive("bulletList") ? "is-active" : "",
        },
        {
            icon: <Link className="icon-size" />,
            onClick: () => setLink(),
            pressed: editor.isActive("link") ? "is-active" : "",
        },
    ];

    return (
        <div className="menu-bar">
            {Options.map((option, index) => (
                <ToggleButton
                    key={index}
                    pressed={option.pressed}
                    onClick={option.onClick}
                >
                    {option.icon}
                </ToggleButton>
            ))}
        </div>
    );
}
