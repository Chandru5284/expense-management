import { cookies } from 'next/headers'
import Link from "next/link"

//  import components
import LoginForm from "@/components/authentication/login-form";
import { Button } from "@/components/ui/button"
import NavigatePreviousPage from "@/components/navigate-previous-page/NavigatePreviousPage";

const LoginPage = () => {
    const cookieStore = cookies()
    const theme = cookieStore.get('test')
    console.log(theme?.value)
    return (
        <div className="h-screen min-h-full bg-gray-100 dark:bg-gray-900 flex justify-end">
            <div className="flex-1 bg-white dark:bg-gray-700 flex flex-col justify-center  py-12 px-4 sm:px-6 xl:px-20 lg:flex-none lg:w-1/2">
                <div>
                    <div className="flex justify-between items-center ">
                        <NavigatePreviousPage />
                        <Button asChild variant="outline"  >
                            <Link href="/auth/signup">Sign up</Link>
                        </Button>
                    </div>
                    <div>
                        <LoginForm />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LoginPage