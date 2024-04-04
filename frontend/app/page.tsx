import React from 'react'

// import components
import { SideBar } from '@/components/dashboard'
import { DarkModeButton } from '@/components/theme-toggler'
import { 
    CalendarDateRangePicker,
    Overview,
    RecentSales,
    Search,
    TeamSwitcher
 } from '@/components/dashboard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from "@/components/ui/scroll-area"
import MobileMenuBar from '@/components/dashboard/MobileMenuBar'

// import icons
import { FaDownload } from "react-icons/fa6";

const HomePage = () => {
	return (
		<div className='bg-accent h-screen w-full sm:flex'>
			<div className='p-5 h-full basis-[8%] hidden sm:block'>
				<div className='h-full bg-card rounded-xl shadow-lg'>
					<SideBar />
				</div>
			</div>
			<div className='p-3 sm:p-5 h-[88%] sm:h-full basis-full sm:basis-[92%]'>
				<div className='h-full bg-card rounded-xl shadow-lg'>

					<div className="flex h-[10%] items-center px-4 ">
						<TeamSwitcher />
						<div className="ml-auto flex items-center space-x-4">
							<div className='hidden sm:block'>
								<Search />
							</div>
							<DarkModeButton />
						</div>

					</div>

					<div className="flex-1 space-y-4 px-4 sm:px-8 h-[15%]">
						<div className="flex pt-6 items-center justify-between space-y-2">
							<h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
							<div className="md:flex items-center space-x-2 hidden">
								<CalendarDateRangePicker />
								<Button className='hover:bg-[#795da5d3] hover:text-neutral-100  bg-[#735DA5] text-neutral-100 font-bold'>Download</Button>
							</div>
							<div className="md:hidden">
								<Button className={`rounded-full h-10 w-10 md:h-16 md:w-16 hover:bg-[#735DA5] hover:text-white  bg-[#735DA5] p-0`}>
									<FaDownload className='w-5 h-5' />
								</Button>
							</div>
						</div>
					</div>

					<div className='px-2 pb-1.5  h-[75%]'>
						<ScrollArea className=" h-full w-full rounded-md">
							<div className="space-y-4 px-2 sm:px-5 pb-4">
								<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
									<Card>
										<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
											<CardTitle className="text-sm font-medium">
												Total Income
											</CardTitle>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												className="h-4 w-4 text-muted-foreground"
											>
												<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
											</svg>
										</CardHeader>
										<CardContent>
											<div className="text-2xl font-bold">$45,231.89</div>
											<p className="text-xs text-muted-foreground">
												+20.1% from last month
											</p>
										</CardContent>
									</Card>
									<Card>
										<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
											<CardTitle className="text-sm font-medium">
												Total Expenses
											</CardTitle>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												className="h-4 w-4 text-muted-foreground"
											>
												<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
												<circle cx="9" cy="7" r="4" />
												<path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
											</svg>
										</CardHeader>
										<CardContent>
											<div className="text-2xl font-bold">+2350</div>
											<p className="text-xs text-muted-foreground">
												+180.1% from last month
											</p>
										</CardContent>
									</Card>
									<Card>
										<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
											<CardTitle className="text-sm font-medium">Total Balance</CardTitle>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												className="h-4 w-4 text-muted-foreground"
											>
												<rect width="20" height="14" x="2" y="5" rx="2" />
												<path d="M2 10h20" />
											</svg>
										</CardHeader>
										<CardContent>
											<div className="text-2xl font-bold">+12,234</div>
											<p className="text-xs text-muted-foreground">
												+19% from last month
											</p>
										</CardContent>
									</Card>
								</div>

								<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
									<Card className="col-span-4">
										<CardHeader>
											<CardTitle>Overview</CardTitle>
										</CardHeader>
										<CardContent className="pl-2">
											<Overview />
										</CardContent>
									</Card>
									<Card className="col-span-3">
										<CardHeader>
											<CardTitle>Recent Transactions</CardTitle>
											<CardDescription>
												You made 265 sales this month.
											</CardDescription>
										</CardHeader>
										<CardContent>
											<RecentSales />
										</CardContent>
									</Card>
								</div>
							</div>
						</ScrollArea>
					</div>

				</div>
			</div>
			<div className='sm:hidden h-[12%] py-1 px-3 '>
				<div className='h-full bg-card rounded-xl shadow-lg flex items-center w-full px-2'>
					<MobileMenuBar />
				</div>
			</div>
		</div>
	)
}

export default HomePage
