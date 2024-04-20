"use client"

import React from 'react'

// import components
import { Button } from '../ui/button'

// import icons
import { IoArrowBack } from 'react-icons/io5'

const NavigatePreviousPage = () => {
    return (
        <Button variant="secondary" className="gap-2 items-center flex" onClick={() => history.back()}>
            <IoArrowBack />Back
        </Button>
    )
}

export default NavigatePreviousPage
