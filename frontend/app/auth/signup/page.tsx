import Link from "next/link"

//  import components
import { Button } from "@/components/ui/button"
import NavigatePreviousPage from "@/components/navigate-previous-page/NavigatePreviousPage";
import SignUpForm from '@/components/authentication/signup-form';

const SignUpPage = () => {
    return (
        <div className="h-screen min-h-full flex justify-center items-center">
            <div className="border p-3 sm:p-9 rounded-md w-full sm:w-[60%] md:w-[40%]">
                <div className='space-y-1'>
                    <h1 className='text-center font-bold text-3xl'>Sign Up</h1>
                    <div className="flex justify-between items-center ">
                        <NavigatePreviousPage />
                        <Button asChild variant="outline"  >
                            <Link href="/auth/login">Login</Link>
                        </Button>
                    </div>
                    <div>
                        <SignUpForm />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SignUpPage