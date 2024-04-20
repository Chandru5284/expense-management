"use client"

import { MemberServices } from "@/services"

export const fetchMemberList = () => {
    var data
    MemberServices.getAll().then((response: any) => {
        data = response
    })
    return data
}