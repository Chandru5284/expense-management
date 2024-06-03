"use client"

import React from 'react';

interface PostCardProps {
  text: string;
}

const PostCard: React.FC<PostCardProps> = ({ text }) => {
  return <div>{text}</div>;
};

export default PostCard;
