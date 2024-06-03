import React, { useState, useRef, useEffect } from "react";


const Dropdown = ({ isOpen, top, right, left }: any) => {

    // console.log(`top-${top} right-${right}`)

    return (
        <div
            className={` mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10 ${isOpen ? "block" : "hidden"} transform`}
            style={{ position: "absolute", top: `${top}px`, left: `${left}px` }}
        >
            {/* Dropdown content */}
            {/* You can place your dropdown content here */}

            <p>Test</p>
        </div>
    );
};



export default function App() {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [cursorCoords, setCursorCoords] = useState<{ top: number; left: number } | null>(null);

    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0, left: 0 });

    const textareaRef: any = useRef(null);
    

    const getCaretCoordinates = (element: any, position: any) => {
        // const span = document.createElement('span');
        // span.textContent = element.value.substring(0, position);
        // span.style.whiteSpace = 'pre-wrap';
        // document.body.appendChild(span);

        const rect = element.getBoundingClientRect();
        // const leftRect = span.getBoundingClientRect();

        // document.body.removeChild(span);

        const lineHeight = parseFloat(getComputedStyle(element).lineHeight);
        const rows = element.value.slice(0, position).split("\n");
        const row = rows.length - 1;
        const col = rows[row].length;

        const fixedRowValue = row >= 2 ? 2 : row;

        return {
            top: rect.top + lineHeight * fixedRowValue,
            // top: fixedRowValue + lineHeight,
            right: rect.right,
            // left: (leftRect.width) - 50,
            left: (rect.width),
            height: lineHeight,
            bottom: rect.bottom,
            lineHeight,
            row,
            col,
        };
    };

    const getCaretCoordinates2 = (element: any, position: any) => {
        const { offsetLeft, offsetTop } = element;
        const range = document.createRange();
        const sel: any = window.getSelection();
        range.setStart(element.childNodes[0], position);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        const rect = range.getBoundingClientRect();
        return {
            top: rect.top + offsetTop,
            right: rect.right + offsetLeft,
        };
    };

    // const handleKeyDown = (event: any) => {
    // 	// Check if Shift and @ keys are pressed
    // 	if (event.key === '@' && event.shiftKey) {
    // 	  // Get the position of the caret within the textarea
    // 	  const { selectionStart, selectionEnd } = event.target;
    // 	  const { top, right } = getCaretCoordinates2(textareaRef.current, selectionEnd);

    // 	  // Now you have the top and right values, you can use them to position your dropdown
    // 	  console.log('Top:', top, 'Right:', right);
    // 	}
    //   };


    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if (event.key === "@" && event.shiftKey) {
                const textarea = textareaRef.current;
                const { selectionStart, selectionEnd } = textarea;
                const caretPos = getCaretCoordinates(textarea, selectionEnd);
                const { top, right, left } = caretPos;

                console.log(caretPos)

                setIsDropdownOpen(true);
                setDropdownPosition({ top, right, left });
            } else {
                setIsDropdownOpen(false);
            }
        };

        const handleClickOutside = (event: any) => {
            if (textareaRef.current && !textareaRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("click", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div className="bg-black h-dvh flex items-center justify-center px-5">

            <div className="space-y-7">
                <div className="space-y-3">
                    <div className="">
                        <textarea ref={textareaRef} name="" id="" cols={70} rows={3} className="px-6 py-3 bg-gray-50 rounded-md w-full" placeholder="Create a post ..." ></textarea>
                        <Dropdown isOpen={true} top={dropdownPosition.top} right={dropdownPosition.right} left={dropdownPosition.left} />
                    </div>
                    <div className="flex justify-end">
                        <button className="font-bold bg-violet-500 px-8 py-1.5 rounded-md">Post</button>
                    </div>
                </div>

                <div className="bg-gray-300 px-6 py-4 rounded-md space-y-10">
                    <p className="text-gray-500">ability to mention people <span className="text-violet-500 font-bold">Samuel Jackson</span></p>

                    <div className="border-t border-gray-400 pt-2 flex items-center gap-x-5">
                        <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center">F</div>
                        <div>
                            <p>Florance angle</p>
                            <p className="text-xs text-gray-500">1 hour ago</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}