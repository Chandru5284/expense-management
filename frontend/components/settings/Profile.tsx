"use client"

import React, { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { AuthenticationServices } from '@/services'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const Profile = () => {

    const queryClient = useQueryClient()

    const [record, setRecord] = React.useState<any>()

    const onHandleChange = (name: any, value: any) => {
        setRecord({ ...record, [name]: value })
        // recordError ? setRecordError({}) : null
    }

    const fetchProfile = () => {
        const data = AuthenticationServices.userProfile().then((response) => {
            setRecord(response.user_profile)
            return response.user_profile
        }).catch((error) => { })
        return data
    }

    useEffect(() => {
        fetchProfile()
    }, [])


    const updateProfileMutation: any = useMutation({
        mutationFn: () => {
            return AuthenticationServices.updateUserProfile(record).then((response) => { }).catch((error) => { })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        }
    })

    const onHandleSubmit = (e: any) => {
        e.preventDefault()
        updateProfileMutation.mutate()
    }

    return (
        <div className='space-y-5'>
            <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader>
                    <CardTitle>Edit Profile</CardTitle>
                    <CardDescription>
                        Edit your profile here.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className='space-y-4' onSubmit={onHandleSubmit}>
                        <Input placeholder="User name"
                            id='username'
                            name='username'
                            value={record?.username || ""}
                            onChange={(e) => onHandleChange(e.target.name, e.target.value)}
                        />
                        <div className="border-t py-4 flex justify-end">
                            <Button>Save</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Profile
