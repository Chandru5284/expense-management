"use client"

import React, { useContext } from 'react'
import { useParams, useRouter } from 'next/navigation';

// import assets
import avatar from '@/assets/images/avatar.png'
import logo from '@/assets/images/logo.svg'

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

// import context
import GlobalContext from '@/context/GlobalContext';

const SideBar = () => {

    const router = useRouter()
    const query = useParams()
    const member_id = query.memberId
    const gContext: any = useContext(GlobalContext);

    const onHandleLogout = () => {
        gContext?.logout();
        router.push('/auth/login');
    }

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
            onClick: onHandleLogout,
        },
    ]


    return (
        <div className="h-full">
            <div className="h-[15%] p-3 flex items-center justify-center">
                <Avatar className='h-12 w-12 sm:h-16 sm:w-16'>
                    <AvatarImage src={logo.src} alt="avatar" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className='h-[57%] p- flex items-center justify-center '>
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
