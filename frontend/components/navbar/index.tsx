import React, { useContext } from 'react'

// import components
import { Search, TeamSwitcher } from '../dashboard'
import { DarkModeButton } from '../theme-toggler'
import { Button } from '../ui/button'
import { CiMenuFries } from 'react-icons/ci'
import MobileSidebar from '../sidebar/MobileSidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Image from 'next/image'
import { Avatar, AvatarFallback } from '../ui/avatar'
import GlobalContext from '@/context/GlobalContext'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { AuthenticationServices } from '@/services'
import { useQuery } from '@tanstack/react-query'

const Navbar = ({ members, currentMember }: any) => {

    const query = useParams()
    const router = useRouter()
    const member_id = query.memberId
    const gContext: any = useContext(GlobalContext);

    const onHandleLogout = () => {
        gContext?.logout();
        router.push('/auth/login');
    }

    const fetchProfile = () => {
        const data = AuthenticationServices.userProfile().then((response) => {
            return response.user_profile
        }).catch((error) => { })
        return data
    }

    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: fetchProfile
    })

    const username_first_letter = profile?.username?.substring(0, 1).toUpperCase()

    return (
        <>
            <TeamSwitcher />
            <div className="ml-auto flex items-center space-x-4">

                <div className='ml-3'>
                    <DarkModeButton />
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className='cursor-pointer'>
                            <AvatarFallback className='bg-primary text-white'>{username_first_letter}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='cursor-pointer' asChild>
                            <Link href={`/app/${member_id}/settings`}>Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer' onClick={() => onHandleLogout()}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    )
}

export default Navbar
