"use client"

import React, { useState, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// import components
import {
    CalendarDateRangePicker,
    Overview,
    RecentSales,
} from '@/components/dashboard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from "@/components/ui/scroll-area"
import { CurrencySeparator } from '@/components/currency/CurrencySeparator'
import Navbar from '@/components/navbar'

// import iconsF
import { FaDownload } from "react-icons/fa6";
import { DashboardServices } from '@/services'
import SkeletonLoading from '@/components/dashboard/SkeletonLoading'
import ExcelDownload from '@/components/excel-download/ExcelDownload'

const DashboardPage = (props: any) => {

    const { params } = props

    const fetchTotalTransactions = () => {
        const data = DashboardServices.getTotalTransactions(params.memberId).then((response) => {
            return response
        }).catch((error) => { })
        return data
    }

    const { data: transaction, isLoading } = useQuery({
        queryKey: ['totalTransactions'],
        queryFn: fetchTotalTransactions
    })

    return (
        <>
            {
                isLoading ?
                    <SkeletonLoading />
                    :
                    <>
                        <div className="flex h-[10%] items-center px-4 ">
                            <Navbar />
                        </div>
                        <div className="flex-1 space-y-4 px-4 sm:px-8 h-[15%]">
                            <div className="flex pt-6 items-center justify-between space-y-2">
                                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                                <ExcelDownload />
                            </div>
                        </div>
                        <div className='px-2 pb-1.5  h-[75%]'>
                            <ScrollArea className=" h-full w-full rounded-md">
                                <div className="space-y-4 px-2 sm:px-5 pb-4">
                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        <Card>
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                <CardTitle className="text-sm font-medium">
                                                    Total Income
                                                </CardTitle>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    className="h-4 w-4 text-muted-foreground"
                                                >
                                                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                                </svg>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-2xl font-bold text-green-500">
                                                    <CurrencySeparator currencyCode={"INR"} amount={transaction?.income} />
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    {transaction?.income_percentage?.includes("-") ? `-${transaction?.income_percentage}` : `+${transaction?.income_percentage}`}% from last month
                                                </p>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                <CardTitle className="text-sm font-medium">
                                                    Total Expenses
                                                </CardTitle>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    className="h-4 w-4 text-muted-foreground"
                                                >
                                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                                    <circle cx="9" cy="7" r="4" />
                                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                                </svg>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-2xl font-bold text-red-500">
                                                    - <CurrencySeparator currencyCode={"INR"} amount={transaction?.expense} />
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    {transaction?.expense_percentage?.includes("-") ? `-${transaction?.expense_percentage}` : `+${transaction?.expense_percentage}`}% from last month
                                                </p>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    className="h-4 w-4 text-muted-foreground"
                                                >
                                                    <rect width="20" height="14" x="2" y="5" rx="2" />
                                                    <path d="M2 10h20" />
                                                </svg>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-2xl font-bold text-indigo-500">
                                                    <CurrencySeparator currencyCode={"INR"} amount={transaction?.total_balance} />
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    {transaction?.total_balance_percentage?.includes("-") ? `-${transaction?.total_balance_percentage}` : `+${transaction?.total_balance_percentage}`}% from last month
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                                        <Card className="col-span-4">
                                            <CardHeader>
                                                <CardTitle>Overview</CardTitle>
                                            </CardHeader>
                                            <CardContent className="pl-2">
                                                <Overview />
                                            </CardContent>
                                        </Card>
                                        <Card className="col-span-3">
                                            <CardHeader>
                                                <CardTitle>Recent Transactions</CardTitle>
                                                <CardDescription>
                                                    You made {transaction?.this_month__total_transaction} transactions in this month.
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className='h-full'>
                                                <RecentSales />
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </ScrollArea>
                        </div>
                    </>
            }
        </>
    )
}

export default DashboardPage
