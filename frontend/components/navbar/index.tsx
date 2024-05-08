import React from 'react'

// import components
import { Search, TeamSwitcher } from '../dashboard'
import { DarkModeButton } from '../theme-toggler'
import { Button } from '../ui/button'
import { CiMenuFries } from 'react-icons/ci'
import MobileSidebar from '../sidebar/MobileSidebar'

const Navbar = ({ members, currentMember }: any) => {
    return (
        <>
            <TeamSwitcher />
            <div className="ml-auto flex items-center space-x-4">
                {/* <div className='hidden sm:block'>
                    <Search />
                </div> */}

                <div className='ml-3'>
                    <DarkModeButton />
                </div>
                {/* <Button variant="outline" className='sm:hidden' size="icon">
                    <CiMenuFries className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <span className="sr-only">Menu</span>
                </Button> */}
                <MobileSidebar />
            </div>
        </>
    )
}

export default Navbar
