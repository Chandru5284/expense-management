import type { Metadata } from "next";

// import components
import { SideBar } from "@/components/dashboard";
import MobileMenuBar from "@/components/dashboard/MobileMenuBar";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='bg-accent h-screen w-full sm:flex'>
            <div className='p-5 h-full basis-[8%] hidden sm:block'>
                <div className='h-full bg-card rounded-xl shadow-lg'>
                    <SideBar />
                </div>
            </div>
            <div className='p-3 sm:p-5 h-[88%] sm:h-full basis-full sm:basis-[92%]'>
                <div className='h-full bg-card rounded-xl shadow-lg'>
                    {children}
                </div>
            </div>
            <div className='sm:hidden h-[12%] py-1 px-3 '>
                <div className='h-full bg-card rounded-xl shadow-lg flex items-center w-full px-2'>
                    <MobileMenuBar />
                </div>
            </div>
        </div>
    );
}
