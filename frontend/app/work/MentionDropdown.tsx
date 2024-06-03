"use client"

import React from 'react';

interface MentionDropdownProps {
  mentions: string[];
  onClose: () => void;
}

const MentionDropdown: React.FC<MentionDropdownProps> = ({ mentions, onClose }) => {
  return (
    <div className="absolute z-10 mt-2 w-64 bg-white border rounded shadow-md">
      {mentions.map((mention, index) => (
        <div key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
          {mention}
        </div>
      ))}
      <button className="block w-full py-2 text-left text-gray-700 hover:bg-gray-100" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default MentionDropdown;
