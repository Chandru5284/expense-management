import React, { useState } from 'react'
import { redirect, useParams, useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// import components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { MemberServices } from '@/services'
import { AlertModal } from '../modals/AlertModal'

const MemberForm = () => {

    const query = useParams()
    const member_id: any = query.memberId
    const queryClient = useQueryClient()
    const router = useRouter()

    const [record, setRecord] = useState<any>({})
    const [openAlertModal, setOpenAlertModal] = useState(false);

    const onHandleChange = (name: any, value: any) => {
        setRecord({ ...record, [name]: value })
        // recordError ? setRecordError({}) : null
    }

    const fetchMemberRecord = () => {
        const data = MemberServices.show(member_id).then((response) => {
            setRecord(response)
            return response
        }).catch((error) => { })
        return data
    }

    const { data: categoryIncome } = useQuery({
        queryKey: ['memberRecord'],
        queryFn: fetchMemberRecord
    })

    const editMemberMutation: any = useMutation({
        mutationFn: () => {
            return MemberServices.update(member_id, record).then((response) => { }).catch((error) => { })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['memberRecord'] });
        }
    })

    const onHandleSubmit = (e: any) => {
        e.preventDefault()
        editMemberMutation.mutate()
    }

    const deleteMutation: any = useMutation({
        mutationFn: () => {
            return MemberServices.discard(member_id).then((response) => {
                setOpenAlertModal(false)
                router.push("/app")
            }).catch((error) => { })

        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['memberRecord'] });
        }
    })

    return (
        <div>
            <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader>
                    <CardTitle>Edit Member</CardTitle>
                    <CardDescription>
                        Edit or delete member.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className='space-y-4' onSubmit={onHandleSubmit}>
                        <Input placeholder="Member Name"
                            id='name'
                            name='name'
                            value={record?.name || ""}
                            onChange={(e) => onHandleChange(e.target.name, e.target.value)}
                        />
                        <Textarea placeholder="Description"
                            id='description'
                            name='description'
                            value={record?.description || ""}
                            onChange={(e) => onHandleChange(e.target.name, e.target.value)} />
                        <div className="border-t py-4 flex justify-between flex-wrap">
                            <Button>Save</Button>
                            <Button type='button' variant={'destructive'} onClick={() => setOpenAlertModal(true)}>Delete</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <AlertModal
                isOpen={openAlertModal}
                onClose={() => setOpenAlertModal(false)}
                onConfirm={() => deleteMutation.mutate()}
                loading={deleteMutation.isPending}
            />
        </div>
    )
}

export default MemberForm
