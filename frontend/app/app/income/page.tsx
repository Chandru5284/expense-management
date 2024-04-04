import React from 'react'

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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// import icons
import { FaDownload, FaMoneyBill } from "react-icons/fa6";
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RiMessage3Line } from 'react-icons/ri'
import { CalendarDatePicker } from '@/components/date-picker/CalendarDatePicker'

const IncomePage = () => {
    return (
        <>
            <div className="flex h-[10%] items-center px-4 ">
                <Navbar />
            </div>
            <div className="flex-1 space-y-4 px-4 sm:px-8 h-[15%]">
                <div className="flex pt-6 items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Income</h2>
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
            <div className='px-4 sm:px-8 pb-1.5  h-[75%] flex w-full gap-5'> 
                <div className='basis-[30%]'>
                    <form className='space-y-4'>
                        <div className='space-y-1.5'>
                            <Input placeholder="Income Title" />
                        </div>
                        <div className='space-y-1.5'>
                            <Input placeholder="Income Amount" />
                        </div>
                        <div className='flex gap-3'>
                            <div className='basis-[50%]'>
                                <CalendarDatePicker />
                            </div>
                            <div className='basis-[50%]'>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a fruit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Fruits</SelectLabel>
                                            <SelectItem value="apple">Apple</SelectItem>
                                            <SelectItem value="banana">Banana</SelectItem>
                                            <SelectItem value="blueberry">Blueberry</SelectItem>
                                            <SelectItem value="grapes">Grapes</SelectItem>
                                            <SelectItem value="pineapple">Pineapple</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div>
                            <Textarea placeholder="Type your message here." />
                        </div>
                        <Button className='w-full'>Add Income</Button>
                    </form>
                </div>
                <div className='basis-[70%]'>
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul role="list" className="divide-y divide-gray-200">
                            <li>
                                <a href="#" className="block hover:bg-gray-50">
                                    <div className="px-4 py-4 sm:px-6 flex w-full items-center">
                                        <div className='basis-[6%]'>
                                            <FaMoneyBill className='text-4xl text-green-500' />
                                        </div>
                                        <div className='basis-[94%]'>
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-indigo-600 truncate">Monthly Salary</p>
                                                <div className="ml-2 flex-shrink-0 flex">
                                                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Income</p>
                                                </div>
                                            </div>
                                            <div className="mt-2 sm:flex sm:justify-between">
                                                <div className="sm:flex">
                                                    <p className="flex items-center text-sm text-gray-500">
                                                        <CurrencySeparator amount={25000} currencyCode='INR' />
                                                    </p>
                                                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                                        <RiMessage3Line className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                                        From monthly salary
                                                    </p>
                                                </div>
                                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">

                                                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                                                    </svg>
                                                    <p>
                                                        <time dateTime="2020-01-07">January 7, 2020</time>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default IncomePage
