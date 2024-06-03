"use client"

import React, { useContext } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation';
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
import GlobalContext from '@/context/GlobalContext';
import { CiLogout } from 'react-icons/ci';
import { IoMdSettings } from 'react-icons/io';

interface Props {
    item: any;
}

const MenuItem = (props: Props) => {

    const { item } = props

    const pathname = usePathname()
    const router = useRouter()
    const gContext: any = useContext(GlobalContext);
    const query = useParams()
    const member_id = query.memberId

    const onHandleLogout = () => {
        gContext?.logout();
        router.push('/auth/login');
    }

    return (
        <ul className="sm:space-y-5 text-sm flex sm:flex-col justify-between w-full">

            {item && item.map((row: any, index: any) => (
                <li className="" key={index}>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>

                                {row.href == "/app/logout" ?
                                    (
                                        <Button variant={"secondary"} className={`rounded-full h-12 w-12 sm:h-16 sm:w-16  p-0 hover:bg-primary hover:text-primary-foreground`} onClick={row.onClick}>
                                            {React.createElement(row.icon, { className: 'w-6 h-6 sm:w-8 sm:h-8' })}
                                        </Button>
                                    )
                                    :
                                    (
                                        <Button variant={row.href == pathname ? "default" : "secondary"} asChild className={`rounded-full h-12 w-12 sm:h-16 sm:w-16  p-0 hover:bg-primary hover:text-primary-foreground`}>
                                            <Link href={row.href}>
                                                {React.createElement(row.icon, { className: 'w-6 h-6 sm:w-8 sm:h-8' })}
                                            </Link>
                                        </Button>
                                    )
                                }

                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={20}>
                                <p>{row.hoverName}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </li>
            ))}
            <li className="sm:hidden">
                {/* <Button className={`rounded-full h-12 w-12 sm:h-16 sm:w-16 hover:bg-[#735DA5] hover:text-white bg-[#D3C5E5] text-black/60 p-0`} onClick={onHandleLogout}>
                    {React.createElement(CiLogout, { className: 'w-6 h-6 sm:w-8 sm:h-8' })}
                </Button> */}
                <Button asChild className={`rounded-full h-12 w-12 sm:h-16 sm:w-16 hover:bg-[#735DA5] hover:text-white  ${`/app/${member_id}/settings` == pathname ? "bg-[#735DA5]" : "bg-[#D3C5E5] text-black/60"} p-0`}>
                    <Link href={`/app/${member_id}/settings`}>
                        {React.createElement(IoMdSettings, { className: 'w-6 h-6 sm:w-8 sm:h-8' })}
                    </Link>
                </Button>
            </li>
        </ul>
    )
}

export default MenuItem
