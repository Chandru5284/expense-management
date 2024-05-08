"use client"

import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

// import components
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Label } from '../ui/label'
import TagInput from '../tag-input/TagInput'
import { Button } from '../ui/button'
import CategoryList from './CategoryList'

// import services
import { CategoryServices } from '@/services'

// import configs
import { expenseSuggestions, incomeSuggestions, transactionDefaultIcons } from '@/config/config'
import { Separator } from '../ui/separator'

const CategoryForm = () => {

    const query = useParams()
    const member_id = query.memberId
    const queryClient = useQueryClient()

    const [incomeTags, setIncomeTags] = useState<any>([]);
    const [expenseTags, setExpenseTags] = useState<any>([]);

    const fetchCategoryIncomeList = () => {
        const data = CategoryServices.getAll(member_id, "INCOME").then((response) => {
            return response.results
        }).catch((error) => { })
        return data
    }

    const { data: categoryIncome } = useQuery({
        queryKey: ['categoryIncomeList'],
        queryFn: fetchCategoryIncomeList
    })

    const fetchCategoryExpenseList = () => {
        const data = CategoryServices.getAll(member_id, "EXPENSE").then((response) => {
            return response.results
        }).catch((error) => { })
        return data
    }

    const { data: categoryExpense } = useQuery({
        queryKey: ['categoryExpenseList'],
        queryFn: fetchCategoryExpenseList
    })


    const createCategoryMutation: any = useMutation({
        mutationFn: (record) => {
            return CategoryServices.create(member_id, record).then((response) => { }).catch((error) => { })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categoryIncomeList'] });
            queryClient.invalidateQueries({ queryKey: ['categoryExpenseList'] });
        }
    })

    const onHandleSubmit = async () => {

        const data: any = []

        incomeTags.forEach((category: any) => {
            data.push(category)
        });

        expenseTags.forEach((category: any) => {
            data.push(category)
        });

        try {
            data.forEach((category: any) => {
                createCategoryMutation.mutate(category)
            })
        } catch {
            console.log("Error creating category")
        } finally {
            setIncomeTags([])
            setExpenseTags([])
        }
    }

    
    return (
        <div>
            <Tabs defaultValue="income" className="">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="income">Income</TabsTrigger>
                    <TabsTrigger value="expense">Expense</TabsTrigger>
                </TabsList>
                <TabsContent value="income">
                    <div className=' mb-5'>
                        <Label htmlFor="name" className="text-xl">Income</Label>
                        <CategoryList data={categoryIncome} type="INCOME" />
                        <Separator className="mt-4" />
                        <TagInput tags={incomeTags} setTags={setIncomeTags} suggestions={incomeSuggestions} type="INCOME" />
                    </div>
                </TabsContent>
                <TabsContent value="expense">
                    <div className=''>
                        <Label htmlFor="name" className="text-xl">Expense</Label>
                        <CategoryList data={categoryExpense} type="EXPENSE" />
                        <Separator className="mt-4" />
                        <TagInput tags={expenseTags} setTags={setExpenseTags} suggestions={expenseSuggestions} type="EXPENSE" />
                    </div>
                </TabsContent>
            </Tabs>
            <div className='flex justify-end gap-x-5 mt-5'>
                <Button type="submit" onClick={onHandleSubmit}>Create</Button>
            </div>
        </div>
    )
}

export default CategoryForm
