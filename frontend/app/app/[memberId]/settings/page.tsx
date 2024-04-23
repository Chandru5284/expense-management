import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const SettingsPage = () => {
    return (
        <>
            <div className="flex-1 space-y-4 px-4 sm:px-8 h-[15%]">
                <div className="flex pt-6 items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                </div>
            </div>

            <div className='px-4 sm:px-8 w-full'>
                <Tabs defaultValue="account" className="w-full">
                    <TabsList className='w-full'>
                        <TabsTrigger value="account" className='w-full'>Account</TabsTrigger>
                        <TabsTrigger value="password" className='w-full'>Password</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">Make changes to your account here.</TabsContent>
                    <TabsContent value="password">Change your password here.</TabsContent>
                </Tabs>
            </div>

        </>
    )
}

export default SettingsPage
