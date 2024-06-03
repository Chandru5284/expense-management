"use client"

import React, { useState } from 'react';

interface PostInputProps {
    onSubmit: (content: string) => void;
}

const PostInput: React.FC<PostInputProps> = ({ onSubmit }) => {
    const [content, setContent] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleSubmit = () => {
        onSubmit(content);
        setContent('');
    };

    return (
        <div className="mb-4">
            <textarea
                className="w-full px-3 py-2 border rounded-md"
                value={content}
                onChange={handleChange}
                placeholder="Write something..."
            />
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleSubmit}>
                Post
            </button>
        </div>
    );
};

export default PostInput;
