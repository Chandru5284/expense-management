"use client"

import React from 'react'
import { useParams } from 'next/navigation';

// import assets
import avatar from '@/assets/images/avatar.png'

// import components
import MenuItem from './MenuItem';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

// import icons
import { RiDashboardLine } from "react-icons/ri";
import { GiReceiveMoney } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";

const SideBar = () => {

    const query = useParams()

    const member_id = query.memberId

    const featureMenu = [
        {
            hoverName: "Dashboard",
            icon: RiDashboardLine,
            href: `/app/${member_id}/dashboard`,
        },
        {
            hoverName: "Income",
            icon: GiReceiveMoney,
            href: `/app/${member_id}/income`,
        },
        {
            hoverName: "Expense",
            icon: GiTakeMyMoney,
            href: `/app/${member_id}/expense`,
        },
    ]

    const settingsMenu = [
        {
            hoverName: "Settings",
            icon: IoMdSettings,
            href: `/app/${member_id}/settings`,
        },
        {
            hoverName: "Logout",
            icon: CiLogout,
            href: "/app/logout",
        },
    ]

    return (
        <div className="h-full">
            <div className="h-[12%] p-3">
                <Avatar className='w-full h-full'>
                    <AvatarImage src={avatar.src} alt="avatar" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className='h-[60%] p- flex items-center justify-center '>
                <div>
                    <MenuItem item={featureMenu} />
                </div>
            </div>

            <div className='h-[28%]  p-3 flex items-center justify-center border-t-2'>
                <div>
                    <MenuItem item={settingsMenu} />
                </div>
            </div>
        </div>
    )
}

export default SideBar
