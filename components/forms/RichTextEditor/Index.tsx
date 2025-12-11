'use client'

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
// import { Button } from './ui/button';
/*import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Code,
  Quote,
} from 'lucide-react';*/
// import { cn } from '@/lib/utils';

import iconBold from './../../../assets/images/icon-rc-format_bold.svg';
import iconItalic from './../../../assets/images/icon-rc-format_italic.svg';
import iconUnderline from './../../../assets/images/icon-rc-format_underlined.svg';
import iconListBullet from './../../../assets/images/icon-rc-format_list_bulleted.svg';
import iconListNumbered from './../../../assets/images/icon-rc-format_list_numbered.svg';
import iconErase from './../../../assets/images/icon-rc-ink_eraser.svg';
import iconUndo from './../../../assets/images/icon-undo.svg';
import iconRedo from './../../../assets/images/icon-redo.svg';

import { Button } from 'react-bootstrap';
import Image from 'next/image';

interface RichTextEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  className?: string;
  editable?: boolean;
}

export const RichTextEditor = ({
  content = '',
  onChange,
  placeholder = 'Start typing...',
  className,
  editable = true,
}: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[200px] p-4',
      },
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  const ToolbarButton = ({
    onClick,
    isActive = false,
    children,
    title,
  }: {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={/*cn(
        'h-8 w-8 p-0',
        isActive && 'bg-accent text-accent-foreground'
      )*/ `${isActive ? 'active' : ""}`}
      title={title}
    >
      {children}
    </Button>
  );

  return (
    <div
      // className={cn('border rounded-lg overflow-hidden bg-background', className)}
      className={`rich-text-editor-wrap  ${className}`}
    >
      {editable && (
        <div className="rich-text-toolbar">
          <ToolbarButton
            onClick={() => {
              console.log("editor.isActive('bold'):", editor.isActive('bold'));
              editor.chain().focus().toggleBold().run()
            }}
            isActive={editor.isActive('bold')}
            title="Bold"
          >
            <Image src={iconBold} alt="Bold" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title="Italic"
          >
            <Image src={iconItalic} alt="Italic" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
            title="Underline"
          >
            <Image src={iconUnderline} alt="Underline" />
          </ToolbarButton>



          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            title="Bullet List"
          >
            <Image src={iconListBullet} alt="List" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            title="Ordered List"
          >
            <Image src={iconListNumbered} alt="List Numbered" />
          </ToolbarButton>



          <ToolbarButton
            onClick={() => editor.chain().focus().deleteSelection().run()}
            title="Undo"
          >
            <Image src={iconErase} alt='Erase' />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            title="Undo"
          >
            <Image src={iconUndo} alt='Undo' />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            title="Redo"
          >
            <Image src={iconRedo} alt='Redo' />
          </ToolbarButton>
        </div>
      )}

      <EditorContent
        editor={editor}
        className="rich-text-editor"
      />
    </div>
  );
};