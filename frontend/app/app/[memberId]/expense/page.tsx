"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

// import components
import { ScrollArea } from "@/components/ui/scroll-area"
import Navbar from '@/components/navbar'
import TransactionTable from '@/components/transaction-list/TransactionTable'
import TransactionLoading from '@/components/transaction-list/TransactionLoading'
import ExcelDownload from '@/components/excel-download/ExcelDownload'

// import services
import { TransactionServices } from '@/services'


const ExpensePage = () => {

    const query = useParams()
    const member_id = query.memberId

    const fetchTransactionList = () => {
        const data = TransactionServices.getAll(member_id, "EXPENSE").then((response) => {
            return response.results
        }).catch((error) => { })
        return data
    }

    const { data: transaction, isLoading } = useQuery({
        queryKey: ['transactionList'],
        queryFn: fetchTransactionList
    })

    return (
        <>
            {isLoading ? (<TransactionLoading />)
                :
                <>
                    <div className="flex h-[10%] items-center px-4 ">
                        <Navbar />
                    </div>
                    <div className="flex-1 space-y-4 px-4 sm:px-8 h-[15%]">
                        <div className="flex pt-6 items-center justify-between space-y-2">
                            <h2 className="text-3xl font-bold tracking-tight">Expense</h2>
                            <ExcelDownload transaction_type="EXPENSE" />
                        </div>
                    </div>
                    <div className='pb-1.5  h-[75%]  w-full px-2 sm:px-4'>
                        <ScrollArea className="h-full w-full px-2 sm:px-4">
                            <TransactionTable transaction={transaction} />
                        </ScrollArea>
                    </div>
                </>
            }
        </>
    )
}

export default ExpensePage


