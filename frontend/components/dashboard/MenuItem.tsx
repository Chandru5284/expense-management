"use client"

import React from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// import components
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

// import assets
import avatar from '@/assets/images/avatar.png'

interface Props {
    item: any;
}

const MenuItem = (props: Props) => {

    const { item } = props

    const pathname = usePathname()

    return (
        <ul className="sm:space-y-5 text-sm flex sm:flex-col justify-between w-full">
            {item && item.map((row: any, index: any) => (
                <li className="" key={index}>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button asChild className={`rounded-full h-12 w-12 sm:h-16 sm:w-16 hover:bg-[#735DA5] hover:text-white  ${row.href == pathname ? "bg-[#735DA5]" : "bg-[#D3C5E5] text-black/60"} p-0`}>
                                    <Link href={row.href}>
                                        {React.createElement(row.icon, { className: 'w-6 h-6 sm:w-8 sm:h-8' })}
                                    </Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={20}>
                                <p>{row.hoverName}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </li>
            ))}
            <li className="sm:hidden">
                <Avatar className='w-12 h-12'>
                    <AvatarImage src={avatar.src}  alt="avatar" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </li>
        </ul>
    )
}

export default MenuItem
