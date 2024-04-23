import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { FaMoneyBill } from "react-icons/fa6"
import { CurrencySeparator } from "../currency/CurrencySeparator"
import { RiMessage3Line } from "react-icons/ri"
import { format } from "date-fns"
import { useParams } from "next/navigation"
import { TransactionServices } from "@/services"
import { useQuery } from "@tanstack/react-query"

// import configs
import { transactionDefaultIcons } from '@/config/config'
import RecentTransactionEmptyState from "./RecentTransactionEmptyState"

export function RecentSales() {

    const query = useParams()

    const member_id = query.memberId

    const fetchTransactionList = () => {
        const data = TransactionServices.getAll(member_id).then((response) => {
            return response.results
        }).catch((error) => { })
        return data
    }

    const { data: transaction } = useQuery({
        queryKey: ['resentTransactionList'],
        queryFn: fetchTransactionList
    })

    const firstThreeRecords = transaction?.slice(0, 4);

    return (
        // <div className="space-y-8">
        //     <div className="flex items-center">
        //         <Avatar className="h-9 w-9">

        //             <AvatarFallback>OM</AvatarFallback>
        //         </Avatar>
        //         <div className="ml-4 space-y-1">
        //             <p className="text-sm font-medium leading-none">Olivia</p>
        //             <p className="text-sm truncate text-muted-foreground">
        //                 olivia.martin@email.com
        //             </p>
        //         </div>
        //         <div className="ml-auto text-xs font-medium">+$1,999.00</div>
        //     </div>
        //     <div className="flex items-center">
        //         <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">

        //             <AvatarFallback>JL</AvatarFallback>
        //         </Avatar>
        //         <div className="ml-4 space-y-1">
        //             <p className="text-sm font-medium leading-none">Jackson Lee</p>
        //             <p className="text-sm text-muted-foreground">jackson.lee@email.com</p>
        //         </div>
        //         <div className="ml-auto font-medium">+$39.00</div>
        //     </div>
        //     <div className="flex items-center">
        //         <Avatar className="h-9 w-9">

        //             <AvatarFallback>IN</AvatarFallback>
        //         </Avatar>
        //         <div className="ml-4 space-y-1">
        //             <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
        //             <p className="text-sm text-muted-foreground">
        //                 isabella.nguyen@email.com
        //             </p>
        //         </div>
        //         <div className="ml-auto font-medium">+$299.00</div>
        //     </div>
        //     <div className="flex items-center">
        //         <Avatar className="h-9 w-9">

        //             <AvatarFallback>WK</AvatarFallback>
        //         </Avatar>
        //         <div className="ml-4 space-y-1">
        //             <p className="text-sm font-medium leading-none">William Kim</p>
        //             <p className="text-sm text-muted-foreground">will@email.com</p>
        //         </div>
        //         <div className="ml-auto font-medium">+$99.00</div>
        //     </div>
        // </div>

        <div className="">

            {firstThreeRecords?.length > 0 && (
                <div className='divide-y divide-gray-200'>
                    {firstThreeRecords && firstThreeRecords.map((row: any, index: any) => {
                        const IconComponent: any = transactionDefaultIcons[row.category.icon]; // Get the corresponding icon component from incomeIcons
                        return (
                            <div key={index} className="">
                                <a href="#" className="block hover:bg-gray-50 space-y-1">
                                    <div className="py-4 flex w-full items-center gap-x-5">
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
            )}

            {firstThreeRecords?.length <= 0 && (
                <div className="">
                    <RecentTransactionEmptyState />
                </div>
            )}

        </div>
    )
}