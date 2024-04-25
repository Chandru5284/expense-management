import React from 'react'

// import components
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const SkeletonLoading = () => {
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
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <Card className=''>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium w-24 h-3 bg-gray-200 dark:bg-gray-700 rounded-md"></CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-green-500 w-52 h-9 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                                    <p className="text-xs text-muted-foreground w-24 h-3 bg-gray-200 dark:bg-gray-700 rounded-md mt-1"></p>
                                </CardContent>
                            </Card>
                            <Card className=''>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium w-24 h-3 bg-gray-200 dark:bg-gray-700 rounded-md"></CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-green-500 w-52 h-9 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                                    <p className="text-xs text-muted-foreground w-24 h-3 bg-gray-200 dark:bg-gray-700 rounded-md mt-1"></p>
                                </CardContent>
                            </Card>
                            <Card className=''>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium w-24 h-3 bg-gray-200 dark:bg-gray-700 rounded-md"></CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-green-500 w-52 h-9 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                                    <p className="text-xs text-muted-foreground w-24 h-3 bg-gray-200 dark:bg-gray-700 rounded-md mt-1"></p>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <div role="status" className="max-w-full p-4 border border-gray-200 rounded shadow  md:p-6 dark:border-gray-700 col-span-4">
                                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
                                <div className="flex items-baseline mt-4">
                                    <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
                                    <div className="w-full h-56 ms-6 bg-gray-200 dark:bg-gray-700 rounded-t-lg"></div>
                                    <div className="w-full bg-gray-200 rounded-t-lg h-72 ms-6 dark:bg-gray-700"></div>
                                    <div className="w-full h-64 ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                                    <div className="w-full bg-gray-200 rounded-t-lg h-80 ms-6 dark:bg-gray-700"></div>
                                    <div className="w-full bg-gray-200 rounded-t-lg h-72 ms-6 dark:bg-gray-700"></div>
                                    <div className="w-full bg-gray-200 rounded-t-lg h-80 ms-6 dark:bg-gray-700"></div>
                                </div>
                                <span className="sr-only">Loading...</span>
                            </div>

                            <div role="status" className="max-w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow  dark:divide-gray-700 md:p-6 dark:border-gray-700 col-span-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    </div>
                                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                </div>
                                <div className="flex items-center justify-between pt-4">
                                    <div>
                                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    </div>
                                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                </div>
                                <div className="flex items-center justify-between pt-4">
                                    <div>
                                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    </div>
                                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                </div>
                                <div className="flex items-center justify-between pt-4">
                                    <div>
                                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    </div>
                                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                </div>
                                <div className="flex items-center justify-between pt-4">
                                    <div>
                                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    </div>
                                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                                </div>
                                <span className="sr-only">Loading...</span>
                            </div>

                        </div>
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}

export default SkeletonLoading
