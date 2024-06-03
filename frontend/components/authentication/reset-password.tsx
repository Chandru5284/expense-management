"use client"

import React, { useContext, useState } from "react"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"

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
    password: string;
    confirm_password: string;
    token: string;
}

interface recordErrorInterface extends recordInterface {
    detail?: string;
    message?: string;
}

const ResetPasswordForm = () => {

    const router = useRouter()
    const gContext: any = useContext(GlobalContext);
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const [record, setRecord] = useState<recordInterface | null | any>()
    const [loading, setLoading] = useState(false)
    const [recordError, setRecordError] = useState<recordErrorInterface | null | any>()

    const onHandleChange = (name: string, value: string | number | boolean) => {
        setRecord({ ...record, [name]: value, token: token })
        recordError ? setRecordError({}) : null
    }

    const submitLoginData = async (e: any) => {
        e.preventDefault()
        setLoading(true);

        if (gContext.isLoggedIn !== null) gContext?.logout()

        AuthenticationServices.resetPassword(record).then((response) => {
            router.push(`/auth/login`);
        }).catch((error: any) => {
            setRecordError(error.response.data)
            setLoading(false);
        })
    }

    return (
        <div className="">
            <form className="space-y-6" action="#" method="POST" onSubmit={submitLoginData} >
                <div>
                    <p className="text-xl font-bold pb-4 pt-4 text-center">Set your new password</p>
                </div>
                {recordError?.message && (
                    <p className="font-medium mt-2 text-red-500 hover:text-red-600 text-sm text-center">{recordError.message || ""}</p>
                )}
                <div className="grid w-full   items-center gap-2">
                    <Label htmlFor="password" className="text-base">Password </Label>
                    <Input type="password" id="password" className="py-7 text-sm font-medium" placeholder="Enter Your password "
                        name="password"
                        value={record?.password || ""}
                        onChange={(e) => onHandleChange(e.target.name, e.target.value)}
                    />
                </div>
                {recordError?.password && (
                    <span className="text-red-500 text-xs italic">{recordError.password || ""}</span>
                )}
                <div className="grid w-full   items-center gap-2">
                    <Label htmlFor="confirm_password" className="text-base">Confirm Password</Label>
                    <Input type="password" id="confirm_password" className="py-7 text-sm font-medium" placeholder="Confirm Your password"
                        name="confirm_password"
                        value={record?.confirm_password || ""}
                        onChange={(e) => onHandleChange(e.target.name, e.target.value)}
                    />
                </div>
                {recordError?.password && (
                    <span className="text-red-500 text-xs italic">{recordError.confirm_password || ""}</span>
                )}
                <Button size="lg" className="p-7 w-full text-base">
                    <LoadingSpinner isLoading={loading} text="Reset" />
                </Button>
            </form>
        </div>
    )
}

export default ResetPasswordForm
