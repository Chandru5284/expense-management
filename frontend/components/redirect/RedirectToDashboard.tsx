"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// import components
import { Loader } from "@/components/ui/loader";

// import services
import { MemberServices } from '@/services'
import OverlayLoader from '../overlay-loader/OverlayLoader';


const RedirectToDashboard = () => {

    const [isMounted, setIsMounted] = useState(false);

    const router = useRouter()

    useEffect(() => {
        if (!isMounted) {
            MemberServices.getAll().then((response: any) => {
                if (response?.results?.length > 0) {
                    router.push(`/app/${response?.results[0].slug}/dashboard`)
                }
            }).catch((error) => { })
        }
    }, [isMounted, setIsMounted])

    return (
        <div className="relative">
            <OverlayLoader />
        </div>
    )
}

export default RedirectToDashboard
