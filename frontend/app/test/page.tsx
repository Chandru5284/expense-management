// "use client"

// import React, { useState, useRef, useEffect } from 'react';

// const MentionInput = ({
//     value,
//     onChange,
//     placeholder,
//     users,
//     renderSuggestion,
//     markup,
//     style,
//     suggestionsStyle,
// }: any) => {
//     const [suggestions, setSuggestions] = useState([]);
//     const [mentionStart, setMentionStart] = useState(null);
//     const [mentionEnd, setMentionEnd] = useState(null);
//     const inputRef: any = useRef(null);

//     useEffect(() => {
//         const handleClickOutside = (event: any) => {
//             if (inputRef.current && !inputRef.current.contains(event.target)) {
//                 setSuggestions([]);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     const handleChange = (event: any) => {
//         const inputValue = event.target.value;
//         onChange(inputValue);

//         const lastAtIndex = inputValue.lastIndexOf('@');
//         const mentionQuery = inputValue.slice(lastAtIndex + 1);

//         if (lastAtIndex !== -1 && mentionQuery.length > 0) {
//             setMentionStart(lastAtIndex);
//             setMentionEnd(inputValue.length);
//             const matchingUsers = users.filter((user: any) =>
//                 user.name.toLowerCase().includes(mentionQuery.toLowerCase())
//             );
//             setSuggestions(matchingUsers);
//         } else {
//             setSuggestions([]);
//             setMentionStart(null);
//             setMentionEnd(null);
//         }
//     };

//     const handleSuggestionClick = (user: any) => {
//         const newValue =
//             value.slice(0, mentionStart) +
//             markup.replace('__display__', user.name).replace('__id__', user.id) +
//             value.slice(mentionEnd);
//         onChange(newValue);
//         setSuggestions([]);
//     };

//     const handleKeyDown = (event: any) => {
//         if (event.key === 'Enter') {
//             event.preventDefault();
//             if (suggestions.length > 0) {
//                 handleSuggestionClick(suggestions[0]);
//             }
//         }
//     };

//     return (
//         <div ref={inputRef} style={{ position: 'relative', ...style }}>
//             <input
//                 type="text"
//                 value={value}
//                 onChange={handleChange}
//                 onKeyDown={handleKeyDown}
//                 placeholder={placeholder}
//                 style={{ width: '100%' }}
//             />
//             {suggestions.length > 0 && (
//                 <div style={{ position: 'absolute', zIndex: 1, ...suggestionsStyle }}>
//                     {suggestions.map((user: any) => (
//                         <div
//                             key={user.id}
//                             onClick={() => handleSuggestionClick(user)}
//                             style={{ cursor: 'pointer' }}
//                             className='bg-black'
//                         >
//                             {renderSuggestion(user)}
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };


// const App = () => {

//     const users = [
//         { id: 'john', name: 'John Doe' },
//         { id: 'jane', name: 'Jane Smith' },
//         // Add more users as needed
//     ];
//     const [value, setValue] = useState('');

//     const handleChange = (newValue: any) => {
//         setValue(newValue);
//     };

//     const renderSuggestion = (user: any) => <div>{user.name}</div>;

//     return (
//         <div>
//             <MentionInput
//                 value={value}
//                 onChange={handleChange}
//                 placeholder="Type something..."
//                 users={users}
//                 renderSuggestion={renderSuggestion}
//                 markup="@[__display__](__id__)"
//                 style={{ width: '300px' }}
//                 suggestionsStyle={{ backgroundColor: 'white', border: '1px solid gray' }}
//             />
//         </div>
//     );
// };

// export default App;



// "use client";

// import React, { useRef, useState } from 'react';

// const CaretPositionCapture = () => {
//     const [caretPosition, setCaretPosition] = useState({ top: 0, left: 0 });
//     const textareaRef = useRef(null);

//     const handleTextareaClick = () => {
//         if (textareaRef.current) {
//             const { top, left } = getCaretPosition(textareaRef.current);
//             setCaretPosition({ top, left });
//         }
//     };

//     const getCaretPosition = (element: any) => {
//         const { selectionStart, selectionEnd } = element;
//         const { offsetLeft, offsetTop, offsetHeight, offsetWidth, style } = element;
//         const { fontSize } = window.getComputedStyle(element);

//         // Calculate the position based on selectionStart
//         const textBeforeCaret = element.value.substring(0, selectionStart);
//         const dummy = document.createElement('span');
//         dummy.textContent = textBeforeCaret;
//         dummy.style.font = `${style.font}`;
//         document.body.appendChild(dummy);
//         const rect = dummy.getBoundingClientRect();
//         document.body.removeChild(dummy);

//         const top = rect.top + window.scrollY + parseInt(fontSize);
//         const left = rect.left + window.scrollX;

//         console.log(top, left)

//         return { top, left };
//     };

//     return (
//         <div className='m-20'>
//             <textarea
//             className='w-full h-96 bg-gray-300 border'
//                 ref={textareaRef}
//                 onClick={handleTextareaClick}
//                 style={{ position: 'relative' }}
//             />
//             <div style={{ position: 'absolute', top: caretPosition.top, left: caretPosition.left }}>
//                 Caret Position
//             </div>
//         </div>
//     );
// };

// export default CaretPositionCapture;


"use client"

import React, { useRef, useState } from 'react';

function App() {
    const textareaRef: any = useRef(null);
    const [textareaValue, setTextareaValue] = useState('');
    const [highlightedText, setHighlightedText] = useState('');

    // Array of objects containing names and their IDs
    const names = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
        { id: 3, name: 'Alice' }
    ];

    // Function to insert person's name into the textarea
    const insertName = (name: any) => {
        // Get the current cursor position
        const cursorPosition = textareaRef.current.selectionStart;

        // Split the textarea value into two parts: before and after the cursor position
        const textBeforeCursor = textareaValue.substring(0, cursorPosition);
        const textAfterCursor = textareaValue.substring(cursorPosition);

        // Update the textarea value by inserting the name at the cursor position
        setTextareaValue(textBeforeCursor + name + textAfterCursor);

        // Update the highlighted text to include the newly inserted name
        setHighlightedText(name);

        // Move the cursor after the inserted name
        const newCursorPosition = cursorPosition + name.length;
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
    };

    // Function to handle backspace key press
    const handleBackspace = (e: any) => {
        // Get the current cursor position
        const cursorPosition = textareaRef.current.selectionStart;

        // Check if the backspace key is pressed and the cursor is at the beginning of a name
        for (let { name } of names) {
            if (
                e.keyCode === 8 && // Backspace key
                textareaValue.substring(cursorPosition - name.length, cursorPosition) === name // Cursor at the beginning of a name
            ) {
                // Delete the entire word
                const textBeforeCursor = textareaValue.substring(0, cursorPosition - name.length);
                const textAfterCursor = textareaValue.substring(cursorPosition);
                setTextareaValue(textBeforeCursor + textAfterCursor);

                // Update the highlighted text
                setHighlightedText('');

                // Move the cursor back
                textareaRef.current.setSelectionRange(cursorPosition - name.length, cursorPosition - name.length);
                e.preventDefault(); // Prevent default behavior of backspace (e.g., navigating back in browser)
                return; // Exit the function after deleting the word
            }
        }
    };

    return (
        <div className='m-20' style={{ position: 'relative', display: 'inline-block' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', backgroundColor: 'yellow' }}>{highlightedText}</div>
            <textarea
                ref={textareaRef}
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                onKeyDown={handleBackspace}
            ></textarea>
            <br />
            {names.map(({ id, name }) => (
                <button key={id} onClick={() => insertName(name)}>{name}</button>
            ))}
        </div>
    );
}

export default App;
