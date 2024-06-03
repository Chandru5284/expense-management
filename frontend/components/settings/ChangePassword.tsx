import React from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { AuthenticationServices } from '@/services'
import { useMutation } from '@tanstack/react-query'
import LoadingSpinner from '../loading-spinner/LoadingSpinner'


const ChangePassword = () => {

    const [record, setRecord] = React.useState<any>()
    const [recordError, setRecordError] = React.useState<any>()

    const onHandleChange = (name: any, value: any) => {
        setRecord({ ...record, [name]: value })
        recordError ? setRecordError({}) : null
    }

    const changePassword: any = useMutation({
        mutationFn: () => {
            return AuthenticationServices.changePassword(record).then((response) => {
                setRecord({})
            }).catch((error) => {
                setRecordError(error.response.data)
            })
        },
    })

    const onHandleSubmit = (e: any) => {
        e.preventDefault()
        changePassword.mutate()
    }

    return (
        <Card x-chunk="dashboard-04-chunk-1">
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                    Change your password here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className='space-y-4' onSubmit={onHandleSubmit}>
                    <Input placeholder="Old Password"
                        type='password'
                        id='old_password'
                        name='old_password'
                        value={record?.old_password || ""}
                        onChange={(e) => onHandleChange(e.target.name, e.target.value)}
                    />
                    {recordError?.old_password && (
                        <p className="text-xs font-semibold text-red-500">
                            {recordError.old_password || ""}
                        </p>
                    )}
                    <Input placeholder="New Password"
                        type='password'
                        id='new_password'
                        name='new_password'
                        value={record?.new_password || ""}
                        onChange={(e) => onHandleChange(e.target.name, e.target.value)}
                    />
                    {recordError?.new_password && (
                        <p className="text-xs font-semibold text-red-500">
                            {recordError.new_password || ""}
                        </p>
                    )}
                    <Input placeholder="Confirm Password"
                        type='password'
                        id='confirm_password'
                        name='confirm_password'
                        value={record?.confirm_password || ""}
                        onChange={(e) => onHandleChange(e.target.name, e.target.value)}
                    />
                    {recordError?.confirm_password && (
                        <p className="text-xs font-semibold text-red-500">
                            {recordError.confirm_password || ""}
                        </p>
                    )}
                    <div className="border-t py-4 flex justify-end">
                        <Button>
                            <LoadingSpinner isLoading={changePassword.isPending} text="Submit" />
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default ChangePassword
