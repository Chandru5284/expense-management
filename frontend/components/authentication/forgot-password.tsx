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
import OverlayLoader from "../overlay-loader/OverlayLoader"

interface recordInterface {
    email: string;
}

interface recordErrorInterface extends recordInterface {
    detail?: string;
    message?: string;
}

const ForgotPasswordForm = () => {

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

        if (gContext.isLoggedIn !== null) gContext?.logout()

        AuthenticationServices.forgotPasswordEmail(record).then((response) => {
            router.push(`/auth/forgot-password-success`);
        }).catch((error: any) => {
            setRecordError(error.response.data)
            setLoading(false);
        })
    }

    return (
        <div className="">
            <form className="space-y-6" action="#" method="POST" onSubmit={submitLoginData} >
                <div>
                    <p className="text-xl font-bold pb-4 pt-4 text-center">Recover your account</p>
                </div>
                {recordError?.message && (
                    <p className="font-medium mt-2 text-red-500 hover:text-red-600 text-sm text-center">{recordError.message || ""}</p>
                )}
                <div className="grid w-full   items-center gap-2">
                    <Label htmlFor="email" className="text-base">Email address </Label>
                    <Input type="email" id="email" className="py-7 text-sm font-medium" placeholder="Enter Your email"
                        name="email"
                        value={record?.email || ""}
                        onChange={(e) => onHandleChange(e.target.name, e.target.value)}
                    />
                </div>
                {recordError?.email && (
                    <span className="text-red-500 text-xs italic">{recordError.email || ""}</span>
                )}
                <Button size="lg" className="p-7 w-full text-base">
                    <LoadingSpinner isLoading={loading} text="Submit" />
                </Button>
            </form>

        </div>
    )
}

export default ForgotPasswordForm
