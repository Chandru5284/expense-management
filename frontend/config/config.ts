"use client"

// import icons
import { RiDashboardLine } from "react-icons/ri";
import { GiReceiveMoney } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";

export const featureMenu = [
    {
        hoverName: "Dashboard",
        icon: RiDashboardLine,
        href: "/app/dashboard",
    },
    {
        hoverName: "Income",
        icon: GiReceiveMoney,
        href: "/app/income",
    },
    {
        hoverName: "Expense",
        icon: GiTakeMyMoney,
        href: "/app/expense",
    },
]

export const settingsMenu = [
    {
        hoverName: "Settings",
        icon: IoMdSettings,
        href: "/app/settings",
    },
    {
        hoverName: "Logout",
        icon: CiLogout,
        href: "/app/logout",
    },
]