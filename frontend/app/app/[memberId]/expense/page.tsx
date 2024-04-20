import React from 'react'

// import components
import {
    CalendarDateRangePicker,
} from '@/components/dashboard'
import { Button } from '@/components/ui/button'
import { ScrollArea } from "@/components/ui/scroll-area"
import Navbar from '@/components/navbar'
import TransactionForm from '@/components/transaction-form/TransactionForm'
import TransactionList from '@/components/transaction-list/TransactionList'

// import icons
import { FaDownload } from "react-icons/fa6";

const ExpensePage = () => {
    return (
        <>
            <div className="flex h-[10%] items-center px-4 ">
                <Navbar />
            </div>
            <div className="flex-1 space-y-4 px-4 sm:px-8 h-[15%]">
                <div className="flex pt-6 items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Expense</h2>
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
            <div className='px-4 sm:px-8 pb-1.5  h-[75%]  w-full '>
                <ScrollArea className="h-full w-full ">
                    <div className='flex flex-col md:flex-row gap-5 w-full '>
                        <div className='basis-[30%]'>
                            <TransactionForm />
                        </div>
                        <div className='basis-[70%] '>
                            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                                <TransactionList />
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </div>
        </>
    )
}

export default ExpensePage
