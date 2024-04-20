// "use client"

// import React, { useState } from "react";

// // import icons
// import { FaTimes } from "react-icons/fa";

// // import components
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge"
// import { expenseSuggestions, incomeSuggestions } from "@/config/config";


// const TagInput = ({ suggestions, tags, setTags }: any) => {

//     // const [tags, setTags] = useState<any>([]);
//     const [inputValue, setInputValue] = useState("");

//     const handleInputChange = (e: any) => {
//         setInputValue(e.target.value);
//     };

//     const handleInputKeyPress = (e: any) => {
//         if (e.key === "Enter" && inputValue.trim() !== "") {
//             setTags([{ "icon": "CiMoneyBill", "title": inputValue.trim() }, ...tags]);
//             setInputValue(""); // Clear the input after adding tag
//             console.log(tags)
//         }
//     };

//     const removeTag = (index: any) => {
//         const newTags = [...tags];
//         newTags.splice(index, 1);
//         setTags(newTags);
//     };

//     const addTag = (tag: any) => {
//         setTags([tag, ...tags]);
//         setInputValue(""); // Clear the input after adding tag
//     };

//     return (
//         <div className="space-y-2 m-10">
//             <div className="flex gap-2">
//                 {tags.map((tag: any, index: any) => (
//                     <Badge
//                         key={index}
//                         className="px-3 py-1 flex items-center hover:bg-none"
//                     >
//                         <span className="mr-3 text-lg">{tag.title}</span>
//                         <button
//                             onClick={() => removeTag(index)}
//                             className="text-red-500 hover:text-red-600 flex items-center outline-none"
//                         >
//                             <FaTimes className="h-4 w-4" />
//                         </button>
//                     </Badge>
//                 ))}
//             </div>
//             <Input
//                 type="text"
//                 value={inputValue}
//                 onChange={handleInputChange}
//                 onKeyUp={handleInputKeyPress}
//                 placeholder="Press Enter to add a tag"
//                 className="border rounded-md px-3 py-1 outline-none"
//             />
//             <div className="flex gap-2 items-center">
//                 <p className="text-sm">Suggestions: </p>
//                 <div className="flex gap-2 flex-wrap">
//                     {suggestions.map((tag: any, index: any) => (
//                         <Badge
//                             key={index}
//                             onClick={() => addTag(tag)}
//                             className="px-3 py-1 flex items-center cursor-pointer"
//                         >
//                             <span className="mr-1">{tag.title}</span>
//                         </Badge>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };



// const TrashPage = () => {
    
//     const [incomeTags, setIncomeTags] = useState<any>([]);
//     const [expenseTags, setExpenseTags] = useState<any>([]);

//     const onHandleClick = () => {
//         console.log(incomeTags)
//         console.log(expenseTags)
//     }

//     return (
//         <div>
//             <TagInput suggestions={incomeSuggestions} tags={incomeTags} setTags={setIncomeTags} />
//             <TagInput suggestions={expenseSuggestions} tags={expenseTags} setTags={setExpenseTags} />
//             <button onClick={onHandleClick}>Submit</button>
//         </div>
//     )
// }

// export default TrashPage




import React from 'react';
import { FaMoneyBillAlt, FaLaptop, FaChartLine, FaBuilding, FaMoneyCheckAlt, FaHandHoldingUsd, FaGift, FaChild, FaBriefcase } from 'react-icons/fa';

const incomeIcons: any = {
    FaMoneyBillAlt: FaMoneyBillAlt,
    FaChartLine: FaChartLine,
    FaLaptop: FaLaptop,
    FaBuilding: FaBuilding,
    FaMoneyCheckAlt: FaMoneyCheckAlt,
    FaHandHoldingUsd: FaHandHoldingUsd,
    FaGift: FaGift,
    FaChild: FaChild,
    FaBriefcase: FaBriefcase,
};

const YourComponent = () => {
    const income = [
        {
            "icon": "FaMoneyBillAlt",
            "title": "Salary",
            "type": "INCOME"
        },
        {
            "icon": "FaLaptop",
            "title": "Freelance Income",
            "type": "INCOME"
        },
        {
            "icon": "FaChartLine",
            "title": "Investment Income",
            "type": "INCOME"
        },
        // Rest of your income data
    ];

    return (
        <div>
            {income.map((item, index) => {
                const IconComponent: any = incomeIcons[item.icon]; // Get the corresponding icon component from incomeIcons
                return (
                    <div key={index}>
                        <IconComponent /> {/* Render the icon component */}
                        <span>{item.title}</span> {/* Render the title */}
                    </div>
                );
            })}
        </div>
    );
};

export default YourComponent;
