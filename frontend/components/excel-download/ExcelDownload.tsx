"use client"

import React, { useState } from 'react'
import { DateRange } from "react-day-picker"
import { addDays, format } from "date-fns"

import { CalendarDateRangePicker } from '../dashboard'
import { Button } from '../ui/button'

import { FaDownload } from 'react-icons/fa6'
import { DashboardServices } from '@/services'
import { useParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import axiosInstance from '@/services/core'
import axios from 'axios'
import Link from 'next/link'

const ExcelDownload = () => {

    const query = useParams()

    const [date, setDate] = useState<any | undefined>()

    const member_id = query.memberId

    // const downloadExcelMutation: any = useMutation({
    //     mutationFn: () => {
    //         return DashboardServices.downloadExcel(member_id).then((response) => {

    //         }).catch((error) => {

    //         })

    //     }
    // })

    const downloadExcelMutation = () => {
        DashboardServices.downloadExcel(member_id).then((response) => {

        }).catch((error) => {

        })
    }

    const onHandleFormSubmit = (e: any) => {
        e.preventDefault()
        const start_date = date?.from ? format(date?.from, "yyyy-MM-dd") : null
        const end_date = date?.to ? format(date?.to, "yyyy-MM-dd") : null

        // if(start_date != null && end_date!= null){
        //     const record = {
        //         "start_date": start_date,
        //         "end_date": end_date
        //     }
        //     console.log(record)
        //     downloadExcelMutation(record)
        // }

        // downloadExcelMutation()

        axios.get("http://127.0.0.1:8002/api/v1/dashboard/member-1/download-excel/?start_date=2024-03-15&end_date=2024-04-15")

    }

    const start_date = date?.from ? format(date?.from, "yyyy-MM-dd") : null
    const end_date = date?.to ? format(date?.to, "yyyy-MM-dd") : null


    return (
        <>
            <div className="md:flex items-center space-x-2 hidden">
                <CalendarDateRangePicker date={date} setDate={setDate} />
                <Button className='hover:bg-[#795da5d3] hover:text-neutral-100  bg-[#735DA5] text-neutral-100 font-bold'>

                    {start_date != null && end_date != null ?
                        (
                            <Link href={`http://127.0.0.1:8002/api/v1/dashboard/member-1/download-excel/?start_date=${start_date}&end_date=${end_date}`}>
                                Download
                            </Link>
                        ) : "Download"
                    }

                </Button>
            </div>
            <div className="md:hidden">
                <Button className={`rounded-full h-10 w-10 md:h-16 md:w-16 hover:bg-[#735DA5] hover:text-white  bg-[#735DA5] p-0`}>
                    <FaDownload className='w-5 h-5' />
                </Button>
            </div>
        </>
    )
}

export default ExcelDownload
