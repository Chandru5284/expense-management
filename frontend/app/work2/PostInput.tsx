"use client"

import React, { useState } from 'react';

interface PostInputProps {
    onSubmit: (text: string) => void;
}

const PostInput: React.FC<PostInputProps> = ({ onSubmit }) => {
    const [text, setText] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            onSubmit(text);
            setText('');
        }
    };

    return (
        <textarea
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="What's on your mind?"
            rows={4}
        />
    );
};

export default PostInput;
