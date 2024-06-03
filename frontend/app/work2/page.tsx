"use client"

import React, { useState } from 'react';
import PostInput from './PostInput';
import PostCard from './PostCard';
import MentionsDropdown from './MentionsDropdown';

const Home: React.FC = () => {
    const [posts, setPosts] = useState<string[]>([]);

    const handlePostSubmit = (text: string) => {
        setPosts([...posts, text]);
    };

    const handleMentionSelect = (mention: string) => {
        // Add mention to post text
        // You can implement your own logic here to insert mention at cursor position
        console.log(`Selected mention: ${mention}`);
    };

    return (
        <div>
            <PostInput onSubmit={handlePostSubmit} />
            {posts.map((post, index) => (
                <PostCard key={index} text={post} />
            ))}
            <MentionsDropdown searchQuery="" onSelect={handleMentionSelect} />
        </div>
    );
};

export default Home;
