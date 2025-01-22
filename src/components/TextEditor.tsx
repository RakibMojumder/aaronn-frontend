"use client";

import EditorJS, { OutputData } from "@editorjs/editorjs";
import { useEffect, useRef } from "react";
import Header from "@editorjs/header";
import Link from "@editorjs/link";
import Checklist from "@editorjs/checklist";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";

interface TextEditorProps {
  onChange?: (content: Record<string, unknown>) => void;
  initialContent?: Record<string, unknown>;
}

const TextEditor = ({ onChange, initialContent }: TextEditorProps) => {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    // Ensure the editor is initialized only in the client environment
    if (typeof window === "undefined") return; // Early return for SSR

    const initEditor = async () => {
      if (!editorRef.current) {
        const editor = new EditorJS({
          holder: "text-editor",
          placeholder: "Enter Project Description",
          tools: {
            header: Header,
            link: Link,
            checkList: Checklist,
            list: List,
            quote: Quote,
            marker: Marker,
          },
          data:
            initialContent && "blocks" in initialContent
              ? (initialContent as unknown as OutputData)
              : undefined,
          minHeight: 200,
          onChange: async () => {
            const content = await editor.save();
            onChange?.(content as unknown as Record<string, unknown>);
          },
        });

        await editor.isReady;
        editorRef.current = editor;
      }
    };

    initEditor();

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [initialContent, onChange]);

  return (
    <div className="relative">
      <div
        id="text-editor"
        className="prose max-w-none w-full min-h-[200px] text-white bg-transparent rounded-lg border border-white/10 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent [&_div.ce-block]:min-h-[3em]"
      />
    </div>
  );
};

export default TextEditor;
