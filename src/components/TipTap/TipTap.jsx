import { EditorContent } from '@tiptap/react'
import './TipTap.css';
import Menubar from './Menubar';

export default function TipTap({editor}) {

  return (
    <>
      <Menubar editor={editor} />
      <EditorContent editor={editor}/>
    </>
  )
}
