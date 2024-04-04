import React from 'react'

import MenuItem from './MenuItem'

// import config
import { featureMenu, settingsMenu } from '@/config/config';

const MobileMenuBar = () => {
    return (
        <div className='w-full'>
            <MenuItem item={featureMenu} />
        </div>
    )
}

export default MobileMenuBar
