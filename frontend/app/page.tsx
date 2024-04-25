import { redirect } from 'next/navigation'

const HomePage = () => {

	return redirect("/auth/login")
}

export default HomePage
