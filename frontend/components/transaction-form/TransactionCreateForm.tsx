"use client"

import React, { useState } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// import components
import { Input } from '../ui/input'
import { CalendarDatePicker } from '../date-picker/CalendarDatePicker'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'

// import services
import { CategoryServices, TransactionServices } from '@/services'

const TransactionCreateForm = ({ open, setOpen }: any) => {

    const query = useParams()
    const pathname = usePathname()
    const queryClient = useQueryClient()
    const member_id = query.memberId
    const transaction_type = pathname == `/app/${member_id}/income` ? "INCOME" : "EXPENSE"

    const [record, setRecord] = useState<any>({})
    const [date, setDate] = useState<any>("")
    const [recordError, setRecordError] = useState<any>()

    const fetchCategoryList = () => {
        const data = CategoryServices.getAll(member_id, transaction_type).then((response) => {
            return response.results
        }).catch((error) => { })
        return data
    }

    const { data: category } = useQuery({
        queryKey: ['categoryList'],
        queryFn: fetchCategoryList
    })

    const onHandleChange = (name: string, value: string | number | boolean) => {
        setRecord({ "transaction_type": transaction_type, ...record, [name]: value })
    }

    const createTransactionMutation: any = useMutation({
        mutationFn: () => {
            return TransactionServices.create(member_id, record).then((response) => {
                setRecord({})
                setDate("")
                setOpen(false)
            }).catch((error) => {
                setRecordError(error.response.data)
            })

        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactionList'] });
        }
    })

    const onHandleFormSubmit = (e: any) => {
        e.preventDefault()
        createTransactionMutation.mutate()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="p-3 sm:p-5">
                <DialogHeader>
                    <DialogTitle>Add Income</DialogTitle>
                    <DialogDescription>
                        Add your income to manage your finances better.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <form className='space-y-4' onSubmit={onHandleFormSubmit}>
                        {recordError?.message && (
                            <p className="font-medium mt-2 text-red-500 hover:text-red-600 text-sm text-center">{recordError.message || ""}</p>
                        )}
                        <div className='space-y-1.5'>
                            <Input placeholder="Income Title"
                                id="title"
                                name="title"
                                value={record?.title}
                                onChange={(e) => onHandleChange(e.target.name, e.target.value)} />
                        </div>
                        {recordError?.title && (
                            <p className="text-red-500 text-xs italic">{recordError.title || ""}</p>
                        )}
                        <div className='space-y-1.5'>
                            <Input placeholder="Income Amount"
                                id="amount"
                                name="amount"
                                value={record?.amount}
                                onChange={(e) => onHandleChange(e.target.name, e.target.value)} />
                        </div>
                        {recordError?.amount && (
                            <p className="text-red-500 text-xs italic">{recordError.amount || ""}</p>
                        )}
                        <div className='flex gap-3'>
                            <div className='basis-[50%]'>
                                <CalendarDatePicker date={date} setDate={setDate} onHandleChange={onHandleChange} />
                                {recordError?.date && (
                                    <p className="text-red-500 text-xs italic">{recordError.date || ""}</p>
                                )}
                            </div>
                            <div className='basis-[50%]'>
                                <Select onValueChange={(value) => onHandleChange('category', value)} value={record?.category?.slug}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={`${transaction_type == "INCOME" ? "Income Type" : "Expense Type"}`} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {category && category.map((row: any, index: any) => (
                                                <SelectItem key={index} value={row.slug}>{row.title}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {recordError?.category && (
                                    <p className="text-red-500 text-xs italic">{recordError.category || ""}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <Textarea placeholder="Type your message here."
                                id="description"
                                name="description"
                                value={record?.description || ""}
                                onChange={(e) => onHandleChange(e.target.name, e.target.value)} />
                            {recordError?.description && (
                                <p className="text-red-500 text-xs italic">{recordError.description || ""}</p>
                            )}
                        </div>
                        <Button className='w-full'>Add Income</Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default TransactionCreateForm
