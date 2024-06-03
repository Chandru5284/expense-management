"use client"

import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

// import components
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from '@/components/ui/button'
import Navbar from '@/components/navbar'
import ExcelDownload from '@/components/excel-download/ExcelDownload'
import TransactionTable from '@/components/transaction-list/TransactionTable'
import TransactionLoading from '@/components/transaction-list/TransactionLoading'
import TransactionCreateForm from '@/components/transaction-form/TransactionCreateForm'

// import services
import { TransactionServices } from '@/services'


const IncomePage = () => {

    const query = useParams()
    const member_id = query.memberId

    const [formOpenModal, setFormOpenModal] = useState(false)

    const fetchTransactionList = () => {
        const data = TransactionServices.getAll(member_id, "INCOME").then((response) => {
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
                            <h2 className="text-3xl font-bold tracking-tight">Income</h2>
                            <ExcelDownload transaction_type="INCOME" />
                        </div>
                    </div>
                    <div className='pb-1.5  h-[75%]  w-full px-2 sm:px-4'>
                        {transaction.length > 0 && (
                            <ScrollArea className="h-full w-full px-2 sm:px-4">
                                <TransactionTable transaction={transaction} />
                            </ScrollArea>
                        )}
                        {transaction.length <= 0 && (
                            <div
                                className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm h-full border-muted-foreground px-5"
                            >
                                <div className="flex flex-col items-center gap-1 text-center">
                                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                                        You have no Income statements
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        You can start creating your income statements.
                                    </p>
                                    <Button className="mt-4" onClick={() => setFormOpenModal(true)}>Add Income</Button>
                                </div>
                            </div>
                        )}
                    </div>

                    <TransactionCreateForm open={formOpenModal} setOpen={setFormOpenModal} />
                </>
            }
        </>
    )
}

export default IncomePage


