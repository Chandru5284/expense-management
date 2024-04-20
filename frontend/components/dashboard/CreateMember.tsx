"use client"

import React, { useContext, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MemberServices } from '@/services'
import { useRouter } from 'next/navigation'
import GlobalContext from '@/context/GlobalContext'
import { useCategoryModal } from '@/hooks/use-category-modal'
import CreateCategory from './CreateCategory'

const CreateMember = (props: any) => {

    const { open, setOpen } = props

    const onOpenCategoryModal = useCategoryModal((state) => state.onOpen);
    const isOpenCategoryModal = useCategoryModal((state) => state.isOpen);
    const onCloseCategoryModal = useCategoryModal((state) => state.onClose);

    const queryClient = useQueryClient()

    const gContext: any = useContext(GlobalContext);

    const [record, setRecord] = useState<any>()
    const [recordError, setRecordError] = useState<any>()

    const [memberId, setMemberId] = useState<any>()

    const router = useRouter()

    const onHandleChange = (name: string, value: string | number | boolean) => {
        setRecord({ ...record, [name]: value })
    }

    const createMemberMutation: any = useMutation({
        mutationFn: () => {
            return MemberServices.create(record).then((response) => {
                gContext?.set_require_member("false")
                // router.push(`/app/${response.slug}/dashboard`)
                setOpen(false)
                setMemberId(response.slug)
                onOpenCategoryModal()
            }).catch((error) => {
                setRecordError(error.response.data)
            })

        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['membersList'] });
        }
    })

    const onHandleFormSubmit = (e: any) => {
        e.preventDefault()
        createMemberMutation.mutate()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className=''>
                <DialogHeader>
                    <DialogTitle>Create Member</DialogTitle>
                    <DialogDescription>
                        Add a new member to manage account.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <form onSubmit={onHandleFormSubmit} className="space-y-4 py-2 pb-4">
                        {recordError?.message && (
                            <p className="font-medium mt-2 text-red-500 hover:text-red-600 text-sm text-center">{recordError.message || ""}</p>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Member name."
                                name="name"
                                value={record?.name || ""}
                                onChange={(e) => onHandleChange(e.target.name, e.target.value)}
                            />
                            {recordError?.name && (
                                <p className="text-red-500 text-xs italic">{recordError.name || ""}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" placeholder="Description"
                                name="description"
                                value={record?.description || ""}
                                onChange={(e) => onHandleChange(e.target.name, e.target.value)}
                            />
                            {recordError?.description && (
                                <p className="text-red-500 text-xs italic">{recordError.description || ""}</p>
                            )}
                        </div>
                        <div className='flex justify-end gap-x-5'>
                            <Button variant="outline" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">Continue</Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
            <CreateCategory open={isOpenCategoryModal} setOpen={onCloseCategoryModal} memberId={memberId} />
        </Dialog>
    )
}

export default CreateMember
