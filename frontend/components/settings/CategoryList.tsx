import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { transactionDefaultIcons } from '@/config/config';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { AlertModal } from '../modals/AlertModal'
import { CategoryServices } from '@/services';

const CategoryList = (props: any) => {

    const { data, type } = props

    const queryClient = useQueryClient()

    const [openAlertModal, setOpenAlertModal] = useState(false);
    const [record, setRecord] = useState<any>({})


    const deleteMutation: any = useMutation({
        mutationFn: (record: any) => {
            return CategoryServices.discard(record.slug).then((response) => {
                setOpenAlertModal(false)
            }).catch((error) => { })

        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categoryIncomeList'] });
            queryClient.invalidateQueries({ queryKey: ['categoryExpenseList'] });
        }
    })

    const onHandleDelete = (slug: any) => {
        setRecord({ "slug": slug })
        setOpenAlertModal(true)
    }


    return (
        <>
            <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {data && data.map((row: any, index: any) => {
                    const IconComponent: any = transactionDefaultIcons[row.icon];
                    return (
                        <li key={index} className="col-span-1 flex shadow-sm rounded-md">
                            <div
                                className={`flex-shrink-0 flex items-center justify-center w-16 text-white ${type == "INCOME" ? "bg-green-500" : "bg-red-500"} text-sm font-medium rounded-l-md`}
                            >
                                <IconComponent className='text-2xl' />
                            </div>

                            <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                                <div className="flex-1 px-4 py-2 text-sm truncate">
                                    <a className="text-gray-900 font-medium hover:text-gray-600">
                                        {row.title}
                                    </a>
                                </div>
                                <div className="flex-shrink-0 pr-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                                <DotsVerticalIcon className="h-4 w-4" />
                                                <span className="sr-only">Toggle menu</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                            onClick={() => onHandleDelete(row.slug)}
                                            >Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>

            <AlertModal
                isOpen={openAlertModal}
                onClose={() => setOpenAlertModal(false)}
                onConfirm={() => deleteMutation.mutate(record)}
                loading={deleteMutation.isPending}
            />
        </>

    )
}

export default CategoryList
