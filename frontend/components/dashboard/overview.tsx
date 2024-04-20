"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
    {
        name: "Jan",
        income: Math.floor(Math.random() * 5000) + 1000,
        expense: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Feb",
        income: Math.floor(Math.random() * 5000) + 1000,
        expense: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Mar",
        income: Math.floor(Math.random() * 5000) + 1000,
        expense: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Apr",
        income: Math.floor(Math.random() * 5000) + 1000,
        expense: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "May",
        income: Math.floor(Math.random() * 5000) + 1000,
        expense: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Jun",
        income: Math.floor(Math.random() * 5000) + 1000,
        expense: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Jul",
        income: Math.floor(Math.random() * 5000) + 1000,
        expense: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Aug",
        income: Math.floor(Math.random() * 5000) + 1000,
        expense: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Sep",
        income: Math.floor(Math.random() * 5000) + 1000,
        expense: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Oct",
        income: Math.floor(Math.random() * 5000) + 1000,
        expense: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Nov",
        income: Math.floor(Math.random() * 5000) + 1000,
        expense: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Dec",
        income: Math.floor(Math.random() * 5000) + 1000,
        expense: Math.floor(Math.random() * 5000) + 1000,
    },
    
]

// console.log(data)

export function Overview() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
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
                {/* <Bar
                    dataKey="expense"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-red-300"
                /> */}
            </BarChart>
        </ResponsiveContainer>
    )
}