import React from 'react'

// import assets
import avatar from '@/assets/images/avatar.png'

// import components
import MenuItem from './MenuItem';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

// import config
import { featureMenu, settingsMenu } from '@/config/config';

const SideBar = () => {
    return (
        <div className="h-full">
            <div className="h-[12%] p-3">
                <Avatar className='w-full h-full'>
                    <AvatarImage src={avatar.src} alt="avatar" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className='h-[60%] p- flex items-center justify-center '>
                <div>
                    <MenuItem item={featureMenu} />
                </div>
            </div>

            <div className='h-[28%]  p-3 flex items-center justify-center border-t-2'>
                <div>
                    <MenuItem item={settingsMenu} />
                </div>
            </div>
        </div>
    )
}

export default SideBar
