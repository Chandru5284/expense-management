import React from 'react'

// import components
import { Search, TeamSwitcher } from '../dashboard'
import { DarkModeButton } from '../theme-toggler'

const Navbar = ({ members, currentMember }: any) => {
    return (
        <>
            <TeamSwitcher />
            <div className="ml-auto flex items-center space-x-4">
                <div className='hidden sm:block'>
                    <Search />
                </div>
                <DarkModeButton />
            </div>
        </>
    )
}

export default Navbar
