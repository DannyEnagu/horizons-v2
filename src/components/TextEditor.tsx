"use client";

import { useTheme } from '@/context/ThemeProvider';
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

interface TextEditorProps {
    onEditorChange: (content: string) => void;
}

export default function TextEditor({ onEditorChange }: TextEditorProps) {
    const editorRef = useRef(null);
    const { mode } = useTheme();

    return (
        <div>
            <Editor
                apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                onInit={(evt, editor) => {
                    // @ts-expect-error - editorRef is not a property of Editor
                    editorRef.current = editor;
                }}
                onEditorChange={(content) => onEditorChange(content)}
                init={{
                    height: 300,
                    menubar: false,
                    plugins: [
                    'advlist',
                    'autolink',
                    'lists',
                    'link',
                    'image',
                    'charmap',
                    'preview',
                    'anchor',
                    'searchreplace',
                    'visualblocks',
                    'codesample',
                    'fullscreen',
                    'insertdatetime',
                    'media',
                    'table',
                    'emoticons',
                    'wordcount',
                    ],
                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                    tinycomments_mode: 'embedded',
                    tinycomments_author: 'Author name',
                    content_style:
                    'body { font-family:Inter,sans-serif; font-size:16px }',
                    skin: mode === 'dark' ? 'oxide-dark' : 'oxide',
                    content_css: mode === 'dark' && 'dark'
                }}
            />
        </div>
    );
}