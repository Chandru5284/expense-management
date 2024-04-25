import React from 'react'

// import components
import { ScrollArea } from '@/components/ui/scroll-area'

const TransactionLoading = () => {
    return (
        <div className='h-full animate-pulse'>
            <div className="flex h-[10%] items-center px-4 ">
                <div className='w-52 h-9 bg-gray-200 dark:bg-gray-700 rounded-md'></div>
                <div className="ml-auto flex items-center space-x-4">
                    <div className='hidden sm:block w-72 h-9 bg-gray-200 dark:bg-gray-700 rounded-md'></div>
                    <div className='w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-md'></div>
                </div>
            </div>
            <div className="flex-1 space-y-4 px-4 sm:px-8 h-[15%]">
                <div className="flex pt-6 items-center justify-between space-y-2 ">
                    <h2 className="text-3xl font-bold tracking-tight bg-gray-200 dark:bg-gray-700 rounded-md w-52 h-7"></h2>
                    <div className="md:flex items-center space-x-2 hidden bg-gray-200 dark:bg-gray-700 rounded-md w-52 h-7">

                    </div>
                </div>
            </div>
            <div className='px-2 pb-1.5  h-[75%]'>
                <ScrollArea className=" h-full w-full rounded-md">
                    <div className="space-y-4 px-2 sm:px-5 pb-4">
                        <div className="">
                            <div className="h-12 bg-gray-200 dark:bg-gray-700 mt-3 mb-6 rounded"></div>
                            <div className="h-12 bg-gray-300 dark:bg-gray-800 mb-6 rounded"></div>
                            <div className="h-12 bg-gray-200 dark:bg-gray-700 mb-6 rounded"></div>
                            <div className="h-12 bg-gray-300 dark:bg-gray-800 mb-6 rounded"></div>
                            <div className="h-12 bg-gray-200 dark:bg-gray-700 mb-6 rounded"></div>
                            <div className="h-12 bg-gray-200 dark:bg-gray-800 mb-6 rounded"></div>
                        </div>
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}

export default TransactionLoading
