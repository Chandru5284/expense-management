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

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"


const CreateCategory = (props: any) => {

    const { open, setOpen, memberId } = props

    const [incomeTags, setIncomeTags] = useState<any>([]);
    const [expenseTags, setExpenseTags] = useState<any>([]);

    const router = useRouter()

    const onHandleFormSubmit = async () => {

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
            {/* overflow-y-scroll scrollbar-none */}
            <DialogContent className='max-w-2xl'>
                <DialogHeader>
                    <DialogTitle>Create Category</DialogTitle>
                    <DialogDescription>
                        Add a new category to manage account.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Tabs defaultValue="income" className="">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="income">Income</TabsTrigger>
                            <TabsTrigger value="expense">Expense</TabsTrigger>
                        </TabsList>
                        <TabsContent value="income">
                            <div className=' mb-5'>
                                <Label htmlFor="name" className="text-xl">Income</Label>
                                <div className="flex gap-2 flex-wrap">
                                </div>
                                <TagInput tags={incomeTags} setTags={setIncomeTags}
                                    suggestions={incomeSuggestions} type="INCOME" />
                            </div>
                        </TabsContent>
                        <TabsContent value="expense">
                            <div className=''>
                                <Label htmlFor="name" className="text-xl">Expense</Label>
                                <div className="flex gap-2 flex-wrap">
                                </div>
                                <TagInput tags={expenseTags} setTags={setExpenseTags} suggestions={expenseSuggestions} type="EXPENSE" />
                            </div>
                        </TabsContent>
                    </Tabs>
                    <div className='flex justify-end gap-x-5 mt-5'>
                        <Button type="submit" onClick={onHandleFormSubmit}>Continue</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CreateCategory
