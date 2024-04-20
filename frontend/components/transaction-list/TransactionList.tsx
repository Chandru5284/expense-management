"use client"

import React from 'react'
import { format } from "date-fns"
import { useParams, usePathname } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

// import components
import { CurrencySeparator } from '../currency/CurrencySeparator'

// import icons
import { FaMoneyBill } from 'react-icons/fa6'
import { RiMessage3Line } from 'react-icons/ri'

// import services
import { TransactionServices } from '@/services'

// import configs
import { transactionDefaultIcons } from '@/config/config'


const TransactionList = () => {

    const query = useParams()

    const member_id = query.memberId

    const pathname = usePathname()

    const expense_type = pathname == `/app/${query.memberId}/income` ? "INCOME" : "EXPENSE"

    const fetchTransactionList = () => {
        const data = TransactionServices.getAll(member_id, expense_type).then((response) => {
            return response.results
        }).catch((error) => { })
        return data
    }

    const { data: transaction } = useQuery({
        queryKey: ['transactionList'],
        queryFn: fetchTransactionList
    })

    console.log(transaction)

    return (
        <div className='divide-y divide-gray-200'>
            {transaction && transaction.map((row: any, index: any) => {
                const IconComponent: any = transactionDefaultIcons[row.category.icon]; // Get the corresponding icon component from incomeIcons
                console.log(IconComponent)
                return (
                    <div key={index} className="">
                        <a href="#" className="block hover:bg-gray-50 space-y-1">
                            <div className="px-4 py-4 sm:px-6 flex w-full items-center gap-x-5">
                                <div className=''>
                                    <IconComponent className='text-4xl text-green-500' />
                                </div>
                                <div className='w-full'>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-indigo-600 truncate">{row.title}</p>
                                        <div className="ml-2 flex-shrink-0 flex">
                                            {row.transaction_type == "INCOME" ?
                                                <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800`}>Income</p>
                                                :
                                                <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-green-800`}>Expense</p>
                                            }
                                        </div>
                                    </div>
                                    <div className="mt-2 sm:flex sm:justify-between flex-wrap gap-3">
                                        <div className="sm:flex flex-wrap gap-3">
                                            <p className="flex items-center text-sm text-gray-500">
                                                <CurrencySeparator amount={row.amount} currencyCode='INR' />
                                            </p>
                                            <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                                <RiMessage3Line className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                                {row.description}
                                            </p>
                                        </div>
                                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">

                                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                                            </svg>
                                            <p>
                                                <time dateTime="2020-01-07">{format(row.date, "PPP")}</time>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                )
            })}
        </div>
    )
}

export default TransactionList
