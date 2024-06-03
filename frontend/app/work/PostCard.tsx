"use client"

import React from 'react';

interface PostCardProps {
    content: string;
}

const PostCard: React.FC<PostCardProps> = ({ content }) => {
    return (
        <div className="mb-4 p-4 bg-gray-100 rounded-md">
            <p>{content}</p>
        </div>
    );
};

export default PostCard;
