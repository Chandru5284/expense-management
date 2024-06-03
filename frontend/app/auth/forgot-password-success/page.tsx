import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const ForgotPasswordSuccessPage = () => {
    return (
        <div className="bg-gray-100 h-dvh flex items-center justify-center p-6">
            <div className="bg-white p-6">
                <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                    <path fill="currentColor"
                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                    </path>
                </svg>
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Email Sent !</h3>
                    <p className="text-gray-600 my-2">Your recover token has sent to your email. Please check and verify to get back !</p>
                    <p> Have a great day!  </p>
                    <div className="py-10 text-center">

                        <Button asChild>
                            <Link href={'/auth/login'}>GO BACK</Link>
                        </Button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordSuccessPage
