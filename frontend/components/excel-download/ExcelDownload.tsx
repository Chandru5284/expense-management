"use client"

import React, { useState } from 'react'
import { DateRange } from "react-day-picker"
import { addDays, format } from "date-fns"
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

import { CalendarDateRangePicker } from '../dashboard'
import { Button } from '../ui/button'
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"

import { FaDownload } from 'react-icons/fa6'
import { DialogTrigger } from '@radix-ui/react-dialog'

const ExcelDownload = ({ transaction_type = "" }: any) => {

    const query = useParams()
    const member_id = query.memberId

    const [date, setDate] = useState<any | undefined>()

    const start_date = date?.from ? format(date?.from, "yyyy-MM-dd") : null
    const end_date = date?.to ? format(date?.to, "yyyy-MM-dd") : null

    const excel_link = `${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/api/v1/dashboard/${member_id}/download-excel/?start_date=${start_date}&end_date=${end_date}&transaction_type=${transaction_type}`

    return (
        <>
            <div className="md:flex items-center space-x-2 hidden">
                <CalendarDateRangePicker date={date} setDate={setDate} months={2} />
                <Button className='hover:bg-[#795da5d3] hover:text-neutral-100  bg-[#735DA5] text-neutral-100 font-bold'>

                    {start_date != null && end_date != null ?
                        (
                            <Link href={excel_link}>
                                Download
                            </Link>
                        ) : "Download"
                    }

                </Button>
            </div>
            <div className="md:hidden">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className={`rounded-full h-10 w-10 md:h-16 md:w-16 hover:bg-[#735DA5] hover:text-white  bg-[#735DA5] p-0`}>
                            <FaDownload className='w-5 h-5' />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <CalendarDateRangePicker date={date} setDate={setDate} />
                        <Button className='hover:bg-[#795da5d3] hover:text-neutral-100  bg-[#735DA5] text-neutral-100 font-bold'>

                            {start_date != null && end_date != null ?
                                (
                                    <Link href={excel_link}>
                                        Download
                                    </Link>
                                ) : "Download"
                            }

                        </Button>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}

export default ExcelDownload
