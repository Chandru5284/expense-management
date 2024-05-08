import React, { useContext } from 'react'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { Home, Package2, PanelLeft, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import GlobalContext from '@/context/GlobalContext'
import { RiDashboardLine } from 'react-icons/ri'
import { GiReceiveMoney, GiTakeMyMoney } from 'react-icons/gi'
import { IoMdSettings } from 'react-icons/io'
import { CiLogout } from 'react-icons/ci'

const MobileSidebar = () => {

    const router = useRouter()
    const query = useParams()
    const pathname = usePathname()
    const member_id = query.memberId
    const gContext: any = useContext(GlobalContext);

    const onHandleLogout = () => {
        gContext?.logout();
        router.push('/auth/login');
    }

    const featureMenu = [
        {
            name: "Dashboard",
            icon: RiDashboardLine,
            href: `/app/${member_id}/dashboard`,
        },
        {
            name: "Income",
            icon: GiReceiveMoney,
            href: `/app/${member_id}/income`,
        },
        {
            name: "Expense",
            icon: GiTakeMyMoney,
            href: `/app/${member_id}/expense`,
        },
    ]

    const settingsMenu = [
        {
            name: "Settings",
            icon: IoMdSettings,
            href: `/app/${member_id}/settings`,
        },
        {
            name: "Logout",
            icon: CiLogout,
            href: "/app/logout",
            onClick: onHandleLogout,
        },
    ]

    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="sm:hidden">
                        <PanelLeft className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="sm:max-w-xs">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="#"
                            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                        >
                            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                            <span className="sr-only">Acme Inc</span>
                        </Link>
                        {/* <Link
                            href="#"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <Home className="h-5 w-5" />
                            Dashboard
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-4 px-2.5 text-foreground"
                        >
                            <ShoppingCart className="h-5 w-5" />
                            Orders
                        </Link> */}

                        <ul className="space-y-5">

                            {featureMenu && featureMenu.map((row: any, index: any) => (
                                <li className="" key={index}>


                                    {row.href == "/app/logout" ?
                                        (
                                            <Button className={`rounded-full h-12 w-12 sm:h-16 sm:w-16 hover:bg-[#735DA5] hover:text-white bg-[#D3C5E5] text-black/60 p-0`} onClick={row.onClick}>
                                                {React.createElement(row.icon, { className: 'w-6 h-6 sm:w-8 sm:h-8' })}
                                            </Button>
                                        )
                                        :
                                        (
                                            <Link href={row.href} className='flex items-center gap-x-3'>
                                                <Button className={`rounded-full h-12 w-12 hover:bg-[#735DA5] hover:text-white  ${row.href == pathname ? "bg-[#735DA5]" : "bg-[#D3C5E5] text-black/60"} p-0`}>
                                                    {React.createElement(row.icon, { className: 'w-6 h-6' })}
                                                </Button>
                                                <span>{row.name}</span>
                                            </Link>
                                        )
                                    }

                                </li>
                            ))}
                        </ul>

                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default MobileSidebar
