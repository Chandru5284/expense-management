"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// const data = [
//     {
//         name: "Jan",
//         income: Math.floor(Math.random() * 5000) + 1000,
//         expense: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Feb",
//         income: Math.floor(Math.random() * 5000) + 1000,
//         expense: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Mar",
//         income: Math.floor(Math.random() * 5000) + 1000,
//         expense: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Apr",
//         income: Math.floor(Math.random() * 5000) + 1000,
//         expense: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "May",
//         income: Math.floor(Math.random() * 5000) + 1000,
//         expense: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Jun",
//         income: Math.floor(Math.random() * 5000) + 1000,
//         expense: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Jul",
//         income: Math.floor(Math.random() * 5000) + 1000,
//         expense: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Aug",
//         income: Math.floor(Math.random() * 5000) + 1000,
//         expense: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Sep",
//         income: Math.floor(Math.random() * 5000) + 1000,
//         expense: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Oct",
//         income: Math.floor(Math.random() * 5000) + 1000,
//         expense: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Nov",
//         income: Math.floor(Math.random() * 5000) + 1000,
//         expense: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Dec",
//         income: Math.floor(Math.random() * 5000) + 1000,
//         expense: Math.floor(Math.random() * 5000) + 1000,
//     },

// ]

// const dataBk: any = {
//     "income": {
//         "Jan": 0,
//         "Feb": 0,
//         "Mar": 15000.0,
//         "Apr": 15000.0,
//         "May": 23300.0,
//         "Jun": 0,
//         "Jul": 0,
//         "Aug": 0,
//         "Sep": 0,
//         "Oct": 0,
//         "Nov": 0,
//         "Dec": 0
//     },
//     "expense": {
//         "Jan": 0,
//         "Feb": 0,
//         "Mar": 0,
//         "Apr": 0,
//         "May": 4000.0,
//         "Jun": 0,
//         "Jul": 0,
//         "Aug": 0,
//         "Sep": 0,
//         "Oct": 0,
//         "Nov": 0,
//         "Dec": 0
//     }
// }

// console.log(data)

export function Overview({ data }: any) {

    const transformData = () => {
        if (!data) return [];
        const months = Object.keys(data?.income);
        // console.log(months)
        const transformedData = months.map(month => ({
            name: month,
            income: data.income[month],
            expense: data.expense[month]
        }));
        return transformedData;
    };

    const transformedData = transformData();

    // transformData()

    console.log(transformedData);


    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={transformedData}>
                <Tooltip />
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={true}
                    axisLine={true}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={true}
                    axisLine={true}
                    tickFormatter={(value) => `$${value}`}
                />
                <Bar
                    dataKey="income"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-[#735DA5]"
                />
                <Bar
                    dataKey="expense"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-red-300"
                />
            </BarChart>
        </ResponsiveContainer>
    )
}