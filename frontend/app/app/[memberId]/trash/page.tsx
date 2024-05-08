"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams, usePathname } from 'next/navigation'

// import components
import {
    CalendarDateRangePicker,
} from '@/components/dashboard'
import { Button } from '@/components/ui/button'
import { ScrollArea } from "@/components/ui/scroll-area"
import Navbar from '@/components/navbar'
import TransactionTable from '@/components/transaction-list/TransactionTable'

// import icons
import { FaDownload } from "react-icons/fa6";

// import services
import { TransactionServices } from '@/services'
import TransactionLoading from '@/components/transaction-list/TransactionLoading'


const IncomePage = () => {

    const query = useParams()
    const member_id = query.memberId
    const pathname = usePathname()
    const expense_type = pathname == `/app/${query.memberId}/income` ? "INCOME" : "INCOME"

    const fetchTransactionList = () => {
        const data = TransactionServices.getAll(member_id, expense_type).then((response) => {
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
                            <h2 className="text-3xl font-bold tracking-tight">Trash</h2>
                            <div className="md:flex items-center space-x-2 hidden">
                                <CalendarDateRangePicker />
                                <Button className='hover:bg-[#795da5d3] hover:text-neutral-100  bg-[#735DA5] text-neutral-100 font-bold'>Download</Button>
                            </div>
                            <div className="md:hidden">
                                <Button className={`rounded-full h-10 w-10 md:h-16 md:w-16 hover:bg-[#735DA5] hover:text-white  bg-[#735DA5] p-0`}>
                                    <FaDownload className='w-5 h-5' />
                                </Button>
                            </div>
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

export default IncomePage


