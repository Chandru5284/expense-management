"use client"

import React, { useState, useEffect } from 'react';

interface MentionsDropdownProps {
  searchQuery: string;
  onSelect: (mention: string) => void;
}

const MentionsDropdown: React.FC<MentionsDropdownProps> = ({ searchQuery, onSelect }) => {
  // Mock data for mentions
  const [mentions, setMentions] = useState<string[]>(['John', 'Jane', 'Doe']);
  const [filteredMentions, setFilteredMentions] = useState<string[]>([]);

  useEffect(() => {
    // Fetch mentions based on searchQuery (you can implement your own logic here)
    // For simplicity, I'm using a mock implementation
    const filteredMentions = mentions.filter(mention =>
      mention.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // Set filtered mentions
    setFilteredMentions(filteredMentions);
  }, [searchQuery]);

  return (
    <div>
      {filteredMentions.map(mention => (
        <div key={mention} onClick={() => onSelect(mention)}>
          {mention}
        </div>
      ))}
    </div>
  );
};

export default MentionsDropdown;
