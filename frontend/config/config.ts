"use client"

// import icons
import { RiDashboardLine } from "react-icons/ri";
import { GiReceiveMoney } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { CiLogout, CiMoneyBill } from "react-icons/ci";

import {
    FaShoppingCart,
    FaUtensils,
    FaBolt,
    FaHome,
    FaCar,
    FaBriefcaseMedical,
    FaFilm,
    FaTshirt,
    FaTools,
    FaGraduationCap,
    FaMoneyBillAlt,
    FaLaptop,
    FaChartLine,
    FaBuilding,
    FaMoneyCheckAlt,
    FaHandHoldingUsd,
    FaGift,
    FaChild,
    FaBriefcase
} from 'react-icons/fa';

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

export const incomeSuggestions = [
    {
        "icon": "FaMoneyBillAlt",
        "title": "Salary",
        "type": "INCOME"
    },
    {
        "icon": "FaLaptop",
        "title": "Freelance",
        "type": "INCOME"
    },
    {
        "icon": "FaChartLine",
        "title": "Investment",
        "type": "INCOME"
    },
    {
        "icon": "FaBuilding",
        "title": "Rental",
        "type": "INCOME"
    },
    {
        "icon": "FaMoneyCheckAlt",
        "title": "Interest",
        "type": "INCOME"
    },
    {
        "icon": "FaHandHoldingUsd",
        "title": "Dividends",
        "type": "INCOME"
    },
    {
        "icon": "FaGift",
        "title": "Bonuses",
        "type": "INCOME"
    },
    {
        "icon": "FaChild",
        "title": "Child Support",
        "type": "INCOME"
    },
    {
        "icon": "FaGift",
        "title": "Gifts or Inheritance",
        "type": "INCOME"
    },
    {
        "icon": "FaBriefcase",
        "title": "Side Hustle",
        "type": "INCOME"
    },
]

export const expenseSuggestions = [
    {
        "icon": "FaShoppingCart",
        "title": "Groceries",
        "type": "EXPENSE"
    },
    {
        "icon": "FaUtensils",
        "title": "Dining Out",
        "type": "EXPENSE"
    },
    {
        "icon": "FaBolt",
        "title": "Utilities",
        "type": "EXPENSE"
    },
    {
        "icon": "FaHome",
        "title": "Rent or Mortgage",
        "type": "EXPENSE"
    },
    {
        "icon": "FaCar",
        "title": "Transportation",
        "type": "EXPENSE"
    },
    {
        "icon": "FaBriefcaseMedical",
        "title": "Health Care",
        "type": "EXPENSE"
    },
    {
        "icon": "FaFilm",
        "title": "Entertainment",
        "type": "EXPENSE"
    },
    {
        "icon": "FaTshirt",
        "title": "Clothing",
        "type": "EXPENSE"
    },
    {
        "icon": "FaTools",
        "title": "Home Maintenance",
        "type": "EXPENSE"
    },
    {
        "icon": "FaGraduationCap",
        "title": "Education",
        "type": "EXPENSE"
    },
]


export const transactionDefaultIcons = {
    FaShoppingCart: FaShoppingCart,
    FaUtensils: FaUtensils,
    FaBolt: FaBolt,
    FaHome: FaHome,
    FaCar: FaCar,
    FaBriefcaseMedical: FaBriefcaseMedical,
    FaFilm: FaFilm,
    FaTshirt: FaTshirt,
    FaTools: FaTools,
    FaGraduationCap: FaGraduationCap,
    FaMoneyBillAlt: FaMoneyBillAlt,
    FaLaptop: FaLaptop,
    FaChartLine: FaChartLine,
    FaBuilding: FaBuilding,
    FaMoneyCheckAlt: FaMoneyCheckAlt,
    FaHandHoldingUsd: FaHandHoldingUsd,
    FaGift: FaGift,
    FaChild: FaChild,
    FaBriefcase: FaBriefcase,
    CiMoneyBill: CiMoneyBill
} as any