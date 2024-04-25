"use client"

import React, { useState } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { format } from "date-fns"

// import components
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '../ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import TransactionFormModal from '../modals/TransactionFormModal'
import { CurrencySeparator } from '../currency/CurrencySeparator'
import TransactionEditForm from '../transaction-form/TransactionEditForm'
import { AlertModal } from '../modals/AlertModal'

// import icons
import { MoreHorizontal } from "lucide-react"

// import services
import { TransactionServices } from '@/services'
import { transactionDefaultIcons } from '@/config/config'
import TransactionCreateForm from '../transaction-form/TransactionCreateForm'


const TransactionTable = ({ transaction }: any) => {

    const queryClient = useQueryClient()
    const query = useParams()
    const member_id = query.memberId
    const pathname = usePathname()
    const expense_type = pathname == `/app/${query.memberId}/income` ? "INCOME" : "EXPENSE"

    const [formOpenModal, setFormOpenModal] = useState(false)
    const [editFormOpenModal, setEditFormOpenModal] = useState(false)
    const [openAlertModal, setOpenAlertModal] = useState(false);
    const [record, setRecord] = useState<any>()

    const fetchTransactionRecord = (slug: any) => {
        TransactionServices.show(slug).then((response) => {
            setRecord(response)
        })
    }

    const onHandleClick = (slug: any) => {
        fetchTransactionRecord(slug)
        setEditFormOpenModal(true)
    }

    const onHandleDelete = (slug: any) => {
        fetchTransactionRecord(slug)
        setOpenAlertModal(true)
    }

    const deleteMutation: any = useMutation({
        mutationFn: (record: any) => {
            return TransactionServices.discard(record.slug).then((response) => {
                setOpenAlertModal(false)
            }).catch((error) => { })

        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactionList'] });
        }
    })

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                            <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead className='hidden md:table-cell'>Category</TableHead>
                        <TableHead className="hidden md:table-cell">Amount</TableHead>
                        <TableHead className="">Date</TableHead>
                        <TableHead>
                            <a className='underline text-indigo-500 cursor-pointer' onClick={() => setFormOpenModal(true)}>Add Income</a>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {transaction && transaction.map((row: any, index: any) => {
                        const IconComponent: any = transactionDefaultIcons[row.category.icon];
                        return (
                            <TableRow key={index}>
                                <TableCell className="hidden sm:table-cell">
                                    <IconComponent className={`w-[72px] h-[72px] border rounded-md p-2 ${expense_type == "INCOME" ? "text-green-500" : "text-red-500"} `} />
                                </TableCell>
                                <TableCell className="font-medium">
                                    <p className='font-bold text-lg'>{row.title}</p>
                                    <p className='text-xs'>{row.description}</p>
                                </TableCell>
                                <TableCell className='hidden md:table-cell'>
                                    <span className=''>{row.category.title}</span>
                                </TableCell>
                                <TableCell className="">
                                    <CurrencySeparator amount={row.amount} currencyCode='INR' />
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {format(row.date, "PPP")}
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">Toggle menu</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem onClick={() => onHandleClick(row.slug)}>Edit</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => onHandleDelete(row.slug)}>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>

            <TransactionCreateForm open={formOpenModal} setOpen={setFormOpenModal} />
            <TransactionEditForm record={record} setRecord={setRecord} open={editFormOpenModal} setOpen={setEditFormOpenModal} />
            <AlertModal
                isOpen={openAlertModal}
                onClose={() => setOpenAlertModal(false)}
                onConfirm={() => deleteMutation.mutate({ "slug": record.slug })}
                loading={deleteMutation.isPending}
            />
        </>
    )
}

export default TransactionTable
