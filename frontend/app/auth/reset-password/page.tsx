import Link from "next/link"

//  import components
import LoginForm from "@/components/authentication/login-form";
import { Button } from "@/components/ui/button"
import NavigatePreviousPage from "@/components/navigate-previous-page/NavigatePreviousPage";
import ResetPasswordForm from "@/components/authentication/reset-password";

const LoginPage = () => {
    return (
        <div className="h-screen min-h-full flex justify-center items-center">
            <div className="border p-3 sm:p-9 rounded-md w-full sm:w-[60%] md:w-[40%]">
                <div className='space-y-1'>
                    <h1 className='text-center font-bold text-3xl'>Reset your password</h1>
                    <div>
                        <ResetPasswordForm />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LoginPage