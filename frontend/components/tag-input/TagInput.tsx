"use client"

import React, { useState } from "react";

// import icons
import { FaTimes } from "react-icons/fa";

// import components
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge"
import { Label } from "../ui/label";

const TagInput = ({ suggestions, tags, setTags, type }: any) => {

    // const [tags, setTags] = useState<any>([]);
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e: any) => {
        setInputValue(e.target.value);
    };

    const handleInputKeyPress = (e: any) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            setTags([{ "icon": "CiMoneyBill", "title": inputValue.trim(), "type": type }, ...tags]);
            setInputValue(""); // Clear the input after adding tag
            console.log(tags)
        }
    };

    const removeTag = (index: any) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
    };

    const addTag = (tag: any) => {
        setTags([tag, ...tags]);
        setInputValue(""); // Clear the input after adding tag
    };
    return (
        <div className="space-y-2">
            {/* <Label htmlFor="name" className="text-xl">Income</Label> */}
            <div className="flex gap-2 flex-wrap mt-2">
                {tags.map((tag: any, index: any) => (
                    <Badge
                        key={index}
                        className="px-3 py-1 flex items-center hover:bg-none"
                    >
                        <span className="mr-3">{tag.title}</span>
                        <button
                            onClick={() => removeTag(index)}
                            className="text-red-500 hover:text-red-600 flex items-center outline-none"
                        >
                            <FaTimes className="h-4 w-4" />
                        </button>
                    </Badge>
                ))}
            </div>

            <Input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyUp={handleInputKeyPress}
                placeholder="Press Enter to add a tag"
                className="border rounded-md px-3 py-1 outline-none w-full"
            />
            <div className="flex gap-2">
                <div className="flex gap-2 flex-wrap items-end">
                    <p className="text-sm">Suggestions: </p>
                    {suggestions && suggestions.map((tag: any, index: any) => (
                        <span key={index} onClick={() => addTag(tag)} className="text-xs underline cursor-pointer">{tag.title}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TagInput;

