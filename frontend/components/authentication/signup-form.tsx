"use client"

import React, { useContext, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

//import components
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

// import services
import { AuthenticationServices } from "@/services"

// import context
import GlobalContext from '@/context/GlobalContext';
import LoadingSpinner from "../loading-spinner/LoadingSpinner"

interface recordInterface {
    username: string;
    email: string;
    password: string;
}

interface recordErrorInterface extends recordInterface {
    detail?: string;
    message?: string;
}

const SignUpForm = () => {

    const router = useRouter()
    const gContext: any = useContext(GlobalContext);

    const [record, setRecord] = useState<recordInterface | null | any>()
    const [loading, setLoading] = useState(false)
    const [recordError, setRecordError] = useState<recordErrorInterface | null | any>()

    const onHandleChange = (name: string, value: string | number | boolean) => {
        setRecord({ ...record, [name]: value })
        recordError ? setRecordError({}) : null
    }

    const submitLoginData = async (e: any) => {
        e.preventDefault()
        setLoading(true);
        try {
            AuthenticationServices.signUp(record).then((response) => {
                gContext?.login(response.access_token, response.refresh_token, response.user_profile)
                gContext?.set_require_member(true)
                router.push(`/app`);
            }).catch((error: any) => {
                setRecordError(error.response.data)
            })
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="">
            <form className="space-y-6" action="#" method="POST" onSubmit={submitLoginData} >
                <div>
                    <p className="text-xl font-bold pb-4 pt-4 text-center">Create your account</p>
                </div>
                {recordError?.message && (
                    <p className="font-medium mt-2 text-red-500 hover:text-red-600 text-sm text-center">{recordError.message || ""}</p>
                )}
                <div className="grid w-full   items-center gap-2">
                    <Label htmlFor="username" className="text-base">Username </Label>
                    <Input type="username" id="username" className="py-7 text-sm font-medium" placeholder="Enter Your username"
                        name="username"
                        value={record?.username || ""}
                        onChange={(e) => onHandleChange(e.target.name, e.target.value)}
                    />
                </div>
                {recordError?.username && (
                    <span className="text-red-500 text-xs italic">{recordError.username || ""}</span>
                )}
                <div className="grid w-full   items-center gap-2">
                    <Label htmlFor="email" className="text-base">Email address </Label>
                    <Input type="email" id="email" className="py-7 text-sm font-medium" placeholder="Enter Your email "
                        name="email"
                        value={record?.email || ""}
                        onChange={(e) => onHandleChange(e.target.name, e.target.value)}
                    />
                </div>
                {recordError?.email && (
                    <span className="text-red-500 text-xs italic">{recordError.email || ""}</span>
                )}
                <div className="grid w-full   items-center gap-2">
                    <Label htmlFor="password" className="text-base">Password  </Label>
                    <Input type="password" id="password" className="py-7 text-sm font-medium" placeholder="Enter Your password "
                        name="password"
                        value={record?.password || ""}
                        onChange={(e) => onHandleChange(e.target.name, e.target.value)}
                    />
                </div>
                {recordError?.password && (
                    <span className="text-red-500 text-xs italic">{recordError.password || ""}</span>
                )}
                <Button size="lg" className="p-7 w-full text-base">
                    <LoadingSpinner isLoading={loading} text="Sign Up" />
                </Button>
            </form>
        </div>
    )
}

export default SignUpForm
