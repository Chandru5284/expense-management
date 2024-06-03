// "use client"

// import React, { useState } from 'react';
// import PostInput from './PostInput';
// import PostCard from './PostCard';
// import MentionDropdown from './MentionDropdown';

// const Home: React.FC = () => {
//     const [posts, setPosts] = useState<string[]>([]);
//     const [mentions, setMentions] = useState<string[]>([]);
//     const [showMentions, setShowMentions] = useState<boolean>(true);

//     const handlePostSubmit = (content: string) => {
//         setPosts([...posts, content]);
//     };

//     const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//         const text = e.target.value;
//         const mentionedUsers = text.match(/@\w+/g);
//         if (mentionedUsers) {
//             setMentions(mentionedUsers.map((mention) => mention.slice(1)));
//             setShowMentions(true);
//         } else {
//             setShowMentions(false);
//         }
//     };

//     return (
//         <div className="container mx-auto py-8">
//             <PostInput onSubmit={handlePostSubmit} handleInputChange={handleInputChange} />
//             {showMentions && <MentionDropdown mentions={mentions} onClose={() => setShowMentions(false)} />}
//             {posts.map((content, index) => (
//                 <PostCard key={index} content={content} />
//             ))}
//         </div>
//     );
// };

// export default Home;



// "use client"

// import React, { useState } from 'react';

// const PostInput: React.FC = () => {
//     const [content, setContent] = useState<string>('');

//     const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//         setContent(e.target.value);
//     };

//     const handleSubmit = () => {
//         setContent('');
//     };

//     return (
//         <div className="m-20">
//             <textarea
//                 className="w-full px-3 py-2 border rounded-md"
//                 value={content}
//                 onChange={handleChange}
//                 placeholder="Write something..."
//             />
//             <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleSubmit}>
//                 Post
//             </button>
//         </div>
//     );
// };

// export default PostInput;


// "use client"
// import React, { useEffect, useRef, useState } from 'react'


// const SlashDropdown: React.FC<{ cursorCoords: { top: number; left: number }, setCursorCoords: any }> = ({
//     cursorCoords,
//     setCursorCoords,
// }) => {

//     const dropdownStyle: React.CSSProperties = {
//         position: 'absolute',
//         top: cursorCoords.top + 'px', // Adjust the top position as needed
//         left: cursorCoords.left + 0 + 'px',
//         backgroundColor: 'white',
//         boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
//         zIndex: 1,
//     };

//     console.log(dropdownStyle)


//     return (
//         <div className="left-1/2 z-10 mt-3" style={dropdownStyle}>
//             <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">

//                 <div className="relative  p-2 h-96 space-y-3">


//                     <p className='font-medium py-2 px-2 text-gray-500'>Blocks</p>
//                     <div className='space-y-2 px-4 pt-1 pb-3 mt-1 border-b border-gray-200'>
//                         Blocksasd
//                     </div>

//                 </div>

//             </div>
//         </div>
//     );
// };



// const page = () => {
//     const [isDropdownVisible, setIsDropdownVisible] = useState(false);
//     const [cursorCoords, setCursorCoords] = useState<{ top: number; left: number } | null>(null);

//     const editorRef = useRef<any>(null); // Ref to the Slate editor

//     const handleSlashKeyPress = (event: any) => {
//         if (event.key === '/') {
//             // Get the cursor position
//             const domSelection = window.getSelection();
//             if (domSelection && domSelection.rangeCount > 0) {
//                 const range = domSelection.getRangeAt(0);
//                 const rect = range.getBoundingClientRect();
//                 const editorRect = editorRef.current.getBoundingClientRect();
//                 const top = rect.bottom - editorRect.top; // Calculate the top position
//                 const left = rect.left - editorRect.left; // Calculate the left position
//                 setCursorCoords({ top, left });
//             }
//             setIsDropdownVisible(true);
//         }
//     };


//     useEffect(() => {

//         // Close the dropdown when the cursor moves or the editor loses focus
//         const handleCursorMove = () => {
//             setIsDropdownVisible(false);
//             // setCursorCoords(null);
//         };


//         if (editorRef.current) {
//             const editorDOM = editorRef.current;
//             // editorDOM.addEventListener('mousemove', handleCursorMove);
//             editorDOM.addEventListener('mousedown', handleCursorMove);
//             // editorDOM.addEventListener('blur', handleEditorBlur);

//         }

//         return () => {
//             if (editorRef.current) {
//                 const editorDOM = editorRef.current;
//                 editorDOM.removeEventListener('mousedown', handleCursorMove);
//                 //         editorDOM.removeEventListener('mousedown', handleCursorMove);
//                 //         editorDOM.removeEventListener('blur', handleEditorBlur);
//             }
//         };
//     }, []);

//     return (
//         <div className='m-10 relative'>
//             <textarea name="" id="" rows={7} cols={70} className='' ref={editorRef} onKeyDown={handleSlashKeyPress}></textarea>
//             {cursorCoords && (
//                 <SlashDropdown cursorCoords={cursorCoords} setCursorCoords={setCursorCoords} />
//             )}
//         </div>
//     )
// }

// export default page


// "use client"
// import React, { useState, useRef } from 'react';

// const CommentSection = () => {
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
//     const textareaRef: any = useRef(null);

//     const handleKeyPress = (event: any) => {
//         if (event.key === '@' && event.shiftKey) {
//             setShowDropdown(true);
//             calculateDropdownPosition();
//         }

//         // if (event.key === 'del') {
//         //     setShowDropdown(true);
//         //     calculateDropdownPosition();
//         // }
//     };

//     const calculateDropdownPosition = () => {
//         if (textareaRef.current) {
//             const { selectionStart, selectionEnd } = textareaRef.current;
//             console.log(selectionStart, selectionEnd)
//             const textareaRect = textareaRef.current.getBoundingClientRect();
//             const caretPosition = getCaretCoordinates(textareaRef.current, selectionStart);

//             setDropdownPosition({
//                 top: textareaRect.top + caretPosition.top + 20, // Adjust this value as needed
//                 left: textareaRect.left + caretPosition.left,
//             });
//         }
//     };

//     const getCaretCoordinates = (element: any, position: any) => {
//         const { style, value } = element;
//         const span = document.createElement('span');
//         span.textContent = value.substring(0, position);
//         span.style.whiteSpace = 'pre-wrap';
//         document.body.appendChild(span);
//         const rect = span.getBoundingClientRect();
//         document.body.removeChild(span);

//         console.log(rect)

//         return {
//             top: rect.height,
//             left: rect.width,
//         };
//     };

//     const handleBlur = () => {
//         setShowDropdown(false);
//     };

//     return (
//         <div className='m-10'>
//             <textarea
//                 cols={70} rows={2} className="px-6 py-3 bg-gray-50 rounded-md w-full" placeholder="Create a post ..."
//                 ref={textareaRef}
//                 onKeyDown={handleKeyPress}
//                 onBlur={handleBlur}
//             />
//             {showDropdown && (
//                 <div className="dropdown" style={{ position: 'absolute', ...dropdownPosition }}>
//                     {/* Dropdown content */}
//                     <ul>
//                         <li>Option 1</li>
//                         <li>Option 2</li>
//                         <li>Option 3</li>
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CommentSection;


// "use client"

// import React, { useState, useRef, useEffect } from 'react';

// const UserMentionMenu = ({ users, onSelect, position }: any) => {
//     return (
//         <div
//             style={{
//                 position: 'absolute',
//                 left: position.left,
//                 top: position.top,
//                 backgroundColor: 'black',
//                 border: '1px solid gray',
//                 padding: '4px',
//             }}
//         >
//             {users.map((user: any) => (
//                 <div key={user.id} className='text-white' onClick={() => onSelect(user)}>
//                     {user.name}
//                 </div>
//             ))}
//         </div>
//     );
// };

// const TextArea = () => {
//     const [showMenu, setShowMenu] = useState(false);
//     const [menuPosition, setMenuPosition] = useState({ left: 0, top: 0 });
//     const [users] = useState([
//         { id: 1, name: 'John Doe' },
//         { id: 2, name: 'Jane Smith' },
//         { id: 3, name: 'Bob Johnson' },
//     ]);
//     const textareaRef: any = useRef(null);

//     const handleKeyDown = (e: any) => {
//         if (e.key === '@') {
//             const textarea: any = textareaRef.current;
//             const { selectionStart, selectionEnd } = textarea;

//             console.log(selectionStart, selectionEnd)

//             const position = textarea.getBoundingClientRect();
//             const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight, 10);
//             const top = position.top + (selectionStart === selectionEnd ? lineHeight : 0);
//             const left = position.left + textarea.scrollLeft;

//             console.log(window.getComputedStyle(textarea));

//             setShowMenu(true);
//             setMenuPosition({ left, top });
//         }
//     };

//     const handleSelect = (user: any) => {
//         const textarea: any = textareaRef.current;
//         const { selectionStart, value } = textarea;
//         const newValue = `${value.slice(0, selectionStart - 1)}@${user.name} ${value.slice(selectionStart)}`;
//         textarea.value = newValue;
//         setShowMenu(false);
//     };

//     useEffect(() => {
//         const handleClickOutside = (e: any) => {
//             if (textareaRef.current && !textareaRef.current.contains(e.target)) {
//                 setShowMenu(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     return (
//         <div className='m-20'>
//             <textarea
//                 ref={textareaRef}
//                 onKeyDown={handleKeyDown}
//                 placeholder="Type @ to mention someone..."
//                 className='border w-full'
//             />
//             {showMenu && (
//                 <UserMentionMenu
//                     users={users}
//                     onSelect={handleSelect}
//                     position={menuPosition}
//                 />
//             )}
//         </div>
//     );
// };

// export default TextArea;

"use client"
import React, { useState } from 'react';

// Sample data for users
const users = [
    { id: 'john', name: 'John Doe' },
    { id: 'jane', name: 'Jane Smith' },
    // Add more users as needed
];

const MentionInput = () => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [cursorPosition, setCursorPosition] = useState(0);

    const handleChange = (event: any) => {
        const inputValue = event.target.value;
        setValue(inputValue);

        // Find the last occurrence of the '@' symbol
        const lastAtIndex = inputValue.lastIndexOf('@');

        // If there is no '@' symbol or it's the last character, clear suggestions
        if (lastAtIndex === -1 || lastAtIndex === inputValue.length - 1) {
            setSuggestions([]);
            return;
        }

        // Extract the mention query
        const mentionQuery = inputValue.slice(lastAtIndex + 1);

        // Filter users based on the mention query
        const matchingUsers: any = users.filter((user) =>
            user.name.toLowerCase().includes(mentionQuery.toLowerCase())
        );

        setSuggestions(matchingUsers);
        setCursorPosition(lastAtIndex + mentionQuery.length + 1);
    };

    const handleSuggestionClick = (user: any) => {
        const newValue = `${value.slice(0, cursorPosition - user.name.length - 1)}@${user.name} ${value.slice(cursorPosition)}`;
        setValue(newValue);
        setSuggestions([]);
    };

    return (
        <div className='m-20'>
            <input
                type="text"
                className='border w-full'
                value={value}
                onChange={handleChange}
                style={{ width: '300px' }}
            />
            {suggestions.length > 0 && (
                <div style={{ position: 'absolute', backgroundColor: 'black', border: '1px solid gray' }}>
                    {suggestions.map((user: any) => (
                        <div key={user.id} onClick={() => handleSuggestionClick(user)}>
                            {user.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MentionInput;



