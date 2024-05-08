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




// import React from 'react';
// import { FaMoneyBillAlt, FaLaptop, FaChartLine, FaBuilding, FaMoneyCheckAlt, FaHandHoldingUsd, FaGift, FaChild, FaBriefcase } from 'react-icons/fa';

// const incomeIcons: any = {
//     FaMoneyBillAlt: FaMoneyBillAlt,
//     FaChartLine: FaChartLine,
//     FaLaptop: FaLaptop,
//     FaBuilding: FaBuilding,
//     FaMoneyCheckAlt: FaMoneyCheckAlt,
//     FaHandHoldingUsd: FaHandHoldingUsd,
//     FaGift: FaGift,
//     FaChild: FaChild,
//     FaBriefcase: FaBriefcase,
// };

// const YourComponent = () => {
//     const income = [
//         {
//             "icon": "FaMoneyBillAlt",
//             "title": "Salary",
//             "type": "INCOME"
//         },
//         {
//             "icon": "FaLaptop",
//             "title": "Freelance Income",
//             "type": "INCOME"
//         },
//         {
//             "icon": "FaChartLine",
//             "title": "Investment Income",
//             "type": "INCOME"
//         },
//         // Rest of your income data
//     ];

//     return (
//         <div>
//             {income.map((item, index) => {
//                 const IconComponent: any = incomeIcons[item.icon]; // Get the corresponding icon component from incomeIcons
//                 return (
//                     <div key={index}>
//                         <IconComponent /> {/* Render the icon component */}
//                         <span>{item.title}</span> {/* Render the title */}
//                     </div>
//                 );
//             })}
//         </div>
//     );
// };

// export default YourComponent;

// "use client"
// import { useTransactionRecord } from '@/hooks/use-transaction-record';
// import React from 'react'


// const TrashPage = () => {

//     const record = useTransactionRecord((state) => state.record);
//     const setRecord = useTransactionRecord((state) => state.setRecord);
//     const removeRecord = useTransactionRecord((state) => state.removeRecord);

//     console.log(record)

//     const data = {
//         "name": "test",
//         "amount": 100
//     }

//     return (
//         <div>
//             <button onClick={() => setRecord(data)}>click</button>
//             <button onClick={() => removeRecord()}>rem</button>
//         </div>
//     )
// }

// export default TrashPage


// import Image from "next/image"
// import Link from "next/link"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// // import assets
// import expenseImg from "@/assets/images/expense_login.jpg"

// const Dashboard = () => {
//     return (
//         <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
//             <div className="flex items-center justify-center py-12">
//                 <div className="mx-auto grid w-[350px] gap-6">
//                     <div className="grid gap-2 text-center">
//                         <h1 className="text-3xl font-bold">Login</h1>
//                         <p className="text-balance text-muted-foreground">
//                             Enter your email below to login to your account
//                         </p>
//                     </div>
//                     <div className="grid gap-4">
//                         <div className="grid gap-2">
//                             <Label htmlFor="email">Email</Label>
//                             <Input
//                                 id="email"
//                                 type="email"
//                                 placeholder="m@example.com"
//                                 required
//                             />
//                         </div>
//                         <div className="grid gap-2">
//                             <div className="flex items-center">
//                                 <Label htmlFor="password">Password</Label>
//                                 <Link
//                                     href="/forgot-password"
//                                     className="ml-auto inline-block text-sm underline"
//                                 >
//                                     Forgot your password?
//                                 </Link>
//                             </div>
//                             <Input id="password" type="password" required />
//                         </div>
//                         <Button type="submit" className="w-full">
//                             Login
//                         </Button>
//                         <Button variant="outline" className="w-full">
//                             Login with Google
//                         </Button>
//                     </div>
//                     <div className="mt-4 text-center text-sm">
//                         Don&apos;t have an account?{" "}
//                         <Link href="#" className="underline">
//                             Sign up
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//             <div className="hidden bg-muted lg:block">
//                 <Image
//                     src={expenseImg}
//                     alt="Image"
//                     width="1920"
//                     height="1080"
//                     className="h-96 w-96 object-cover dark:brightness-[0.2] dark:grayscale"
//                 />
//             </div>
//         </div>
//     )
// }
// export default Dashboard


"use client"
import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        date: '2000-01',
        uv: 4000,
        pv: 2400,
        // amt: 2400,
    },
    {
        date: '2000-02',
        uv: 3000,
        pv: 1398,
        // amt: 2210,
    },
    {
        date: '2000-03',
        uv: 2000,
        pv: 9800,
        // amt: 2290,
    },
    {
        date: '2000-04',
        uv: 2780,
        pv: 3908,
        // amt: 2000,
    },
    {
        date: '2000-05',
        uv: 1890,
        pv: 4800,
        // amt: 2181,
    },
    {
        date: '2000-06',
        uv: 2390,
        pv: 3800,
        // amt: 2500,
    },
    {
        date: '2000-07',
        uv: 3490,
        pv: 4300,
        // amt: 2100,
    },
    {
        date: '2000-08',
        uv: 4000,
        pv: 2400,
        // amt: 2400,
    },
    {
        date: '2000-09',
        uv: 3000,
        pv: 1398,
        // amt: 2210,
    },
    {
        date: '2000-10',
        uv: 2000,
        pv: 9800,
        // amt: 2290,
    },
    {
        date: '2000-11',
        uv: 2780,
        pv: 3908,
        // amt: 2000,
    },
    {
        date: '2000-12',
        uv: 1890,
        pv: 4800,
        // amt: 2181,
    },
];

const monthTickFormatter: any = (tick: any) => {
    const date = new Date(tick);

    return date.getMonth() + 1;
}

const renderQuarterTick: any = (tickProps: any) => {
    const { x, y, payload } = tickProps;
    const { value, offset } = payload;
    const date = new Date(value);
    const month = date.getMonth();
    const quarterNo = Math.floor(month / 3) + 1;
    const isMidMonth = month % 3 === 1;

    if (month % 3 === 1) {
        return <text x={x} y={y - 4} textAnchor="middle">{`Q${quarterNo}`}</text>;
    }

    const isLast = month === 11;

    if (month % 3 === 0 || isLast) {
        const pathX = Math.floor(isLast ? x + offset : x - offset) + 0.5;

        return <path d={`M${pathX},${y - 4}v${-35}`} stroke="red" />;
    }
    return null;
};
export default class Example extends PureComponent {
    // static demoUrl = 'https://codesandbox.io/s/bar-chart-with-double-xaxis-dfug7';

    render() {
        return (
            <div className='grid grid-cols-4'>
                <div className='h-96 m-10 col-span-2'>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={monthTickFormatter} />
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                interval={0}
                                tick={renderQuarterTick}
                                height={1}
                                scale="band"
                                xAxisId="quarter"
                            />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="pv" fill="#8884d8" />
                            <Bar dataKey="uv" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className='col-span-1'>dd</div>
            </div>
        );
    }
}
