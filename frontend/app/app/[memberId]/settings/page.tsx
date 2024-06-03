"use client"

import React, { useState } from 'react'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import CategoryForm from '@/components/settings/CategoryForm'
import MemberForm from '@/components/settings/MemberForm'
import Profile from '@/components/settings/Profile'
import Navbar from '@/components/navbar'
import ChangePassword from '@/components/settings/ChangePassword'
import { ScrollArea } from '@/components/ui/scroll-area'


const SettingsPage = () => {

    const [menu, setMenu] = useState("PROFILE")

    return (
        <>
            <div className="flex h-[10%] items-center px-4 ">
                <Navbar />
            </div>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 h-[90%]">
                <div className="mx-auto grid w-full gap-2">
                    <h1 className="text-3xl font-semibold">Settings</h1>
                </div>

                <div className="mx-auto grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] h-[90%]">
                    <nav
                        className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
                    >
                        <a className={`font-semibold cursor-pointer ${menu == "PROFILE" ? "text-primary" : ""}`} onClick={() => setMenu("PROFILE")}>Profile</a>
                        <a className={`font-semibold cursor-pointer ${menu == "CHANGE_PASSWORD" ? "text-primary" : ""}`} onClick={() => setMenu("CHANGE_PASSWORD")}>Password</a>
                        <a className={`font-semibold cursor-pointer ${menu == "MEMBER" ? "text-primary" : ""}`} onClick={() => setMenu("MEMBER")}>Member</a>
                        <a className={`font-semibold cursor-pointer ${menu == "CATEGORY" ? "text-primary" : ""}`} onClick={() => setMenu("CATEGORY")}>Category</a>
                    </nav>

                    <ScrollArea className='h-full'>
                        {menu == "PROFILE" && (<Profile />)}

                        {menu == "CHANGE_PASSWORD" && (<ChangePassword />)}

                        {menu == "MEMBER" && (<MemberForm />)}

                        {menu == "CATEGORY" && (<CategoryForm />)}
                    </ScrollArea>

                </div>
            </main>

        </>
    )
}

export default SettingsPage
