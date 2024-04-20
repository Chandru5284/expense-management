"use client"

import React, { useContext, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CategoryServices, MemberServices } from '@/services'
import { useParams, useRouter } from 'next/navigation'
import GlobalContext from '@/context/GlobalContext'
import TagInput from '../tag-input/TagInput'
import { expenseSuggestions, incomeSuggestions } from '@/config/config'
import { Badge } from '../ui/badge'
import { FaTimes } from 'react-icons/fa'

const CreateCategory = (props: any) => {

    const { open, setOpen, memberId } = props

    console.log(memberId)

    const query = useParams()

    // const member_id = query.memberId

    const queryClient = useQueryClient()

    const gContext: any = useContext(GlobalContext);

    const [record, setRecord] = useState<any>()
    const [recordError, setRecordError] = useState<any>()
    const [incomeTags, setIncomeTags] = useState<any>([]);
    const [expenseTags, setExpenseTags] = useState<any>([]);

    const router = useRouter()

    const onHandleChange = (name: string, value: string | number | boolean) => {
        setRecord({ ...record, [name]: value })
    }

    const createMemberMutation: any = useMutation({
        mutationFn: (record) => {
            return CategoryServices.create(memberId, record).then((response) => {
                // gContext?.set_require_member("false")
                // router.push(`/app/${response.slug}/dashboard`)
                // setOpen(false)
            }).catch((error) => {
                setRecordError(error.response.data)
            })

        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['membersList'] });
        }
    })


    const onHandleFormSubmit = async () => {
        // createMemberMutation.mutate()

        const data: any = []

        incomeTags.forEach((category: any) => {
            data.push(category)
        });

        expenseTags.forEach((category: any) => {
            data.push(category)
        });

        try {
            data.forEach((category: any) => {
                CategoryServices.create(memberId, category)
            })
        } catch {
            console.log("Error creating category")
        } finally {
            setOpen(false)
            router.push(`/app/${memberId}/dashboard`)
        }
    }

    return (
        <Dialog open={open}>
            <DialogContent className='max-w-2xl h-[75%] overflow-y-scroll scrollbar-none'>
                <DialogHeader>
                    <DialogTitle>Create Category</DialogTitle>
                    <DialogDescription>
                        Add a new category to manage account.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <div className="space-y-4">
                        {recordError?.message && (
                            <p className="font-medium mt-2 text-red-500 hover:text-red-600 text-sm text-center">{recordError.message || ""}</p>
                        )}
                        <div className="">
                            <div className=' mb-5'>
                                <Label htmlFor="name" className="text-xl">Income</Label>
                                <div className="flex gap-2 flex-wrap">
                                </div>
                                <TagInput tags={incomeTags} setTags={setIncomeTags}
                                    suggestions={incomeSuggestions} type="INCOME" />
                            </div>

                            <div className='mt-5'>
                                <Label htmlFor="name" className="text-xl">Expense</Label>
                                <div className="flex gap-2 flex-wrap">
                                </div>
                                <TagInput tags={expenseTags} setTags={setExpenseTags} suggestions={expenseSuggestions} type="EXPENSE" />
                            </div>
                            {recordError?.name && (
                                <p className="text-red-500 text-xs italic">{recordError.name || ""}</p>
                            )}
                        </div>
                        <div className='flex justify-end gap-x-5'>
                            <Button type="submit" onClick={onHandleFormSubmit}>Continue</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CreateCategory
