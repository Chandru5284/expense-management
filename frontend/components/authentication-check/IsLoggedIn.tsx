"use client"

import React, { useContext } from 'react'

// import context
import GlobalContext from '@/context/GlobalContext';

const isLoggedIn = () => {
    const gContext: any = useContext(GlobalContext);
    if (gContext?.isLoggedIn) {
        return true
    } else {
        return false
    }
}

export default isLoggedIn
