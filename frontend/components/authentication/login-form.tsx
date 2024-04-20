"use client"

import React, { useContext, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

//import components
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

// import services
import { AuthenticationServices } from "@/services"

// import context
import GlobalContext from '@/context/GlobalContext';
import isLoggedIn from "../authentication-check/IsLoggedIn"

interface recordInterface {
    username: string;
    password: string;
}

interface recordErrorInterface extends recordInterface {
    detail?: string;
    message?: string;
}

const LoginForm = () => {

    const router = useRouter()
    const gContext: any = useContext(GlobalContext);

    const [record, setRecord] = useState<recordInterface | null | any>()
    const [loading, setLoading] = useState(false)

    const [recordError, setRecordError] = useState<recordErrorInterface | null | any>()

    const onHandleChange = (name: string, value: string | number | boolean) => {
        setRecord({ ...record, [name]: value })
    }

    const submitLoginData = async (e: any) => {
        e.preventDefault()
        try {
            setLoading(true);
            AuthenticationServices.login(record).then((response) => {
                gContext?.login(response.access_token, response.refresh_token, response.user_profile)
                gContext?.set_require_member(response.require_member_info)
                console.log(response);
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
            <form className="space-y-6 " action="#" method="POST" onSubmit={submitLoginData} >
                <div>
                    {/* <Link href="/" className="flex justify-center items-center  ">
                        <Image src={logo} alt="/" className="w-auto h-16 " />
                    </Link> */}
                    <p className="text-xl font-bold pb-4 pt-4 text-center">Get back to your account</p>
                </div>
                {recordError?.message && (
                    <p className="font-medium mt-2 text-red-500 hover:text-red-600 text-sm text-center">{recordError.message || ""}</p>
                )}
                <div className="grid w-full   items-center gap-2">
                    <Label htmlFor="username" className="text-base">Email address </Label>
                    <Input type="username" id="username" className="py-7 text-sm font-medium" placeholder="Enter Your username or email "
                        name="username"
                        value={record?.username || ""}
                        onChange={(e) => onHandleChange(e.target.name, e.target.value)}
                    />
                </div>
                {recordError?.username && (
                    <p className="text-red-500 text-xs italic">{recordError.username || ""}</p>
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
                    <p className="text-red-500 text-xs italic">{recordError.password || ""}</p>
                )}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms">   Remember me</Label>
                    </div>
                    <Button variant="link"><Link href="/auth/forgot-password">Forgot Password</Link></Button>
                </div>
                <Button disabled={loading} variant="destructive" size="lg" className="p-7 w-full text-base">
                    Login
                </Button>
            </form>
        </div>
    )
}

export default LoginForm