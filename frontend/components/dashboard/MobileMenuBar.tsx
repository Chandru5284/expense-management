"use client"

import React from 'react'

import MenuItem from './MenuItem'
import { useParams, useRouter } from 'next/navigation'
import { RiDashboardLine } from 'react-icons/ri'
import { GiReceiveMoney, GiTakeMyMoney } from 'react-icons/gi'


const MobileMenuBar = () => {

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

    return (
        <div className='w-full'>
            <MenuItem item={featureMenu} />
        </div>
    )
}

export default MobileMenuBar
