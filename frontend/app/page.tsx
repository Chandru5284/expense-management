import React from 'react'
import Link from 'next/link'

// import components
import { Button } from '@/components/ui/button'

const HomePage = () => {
	return (
		<div className='flex items-center justify-center h-screen'>
			<Button asChild>
				<Link href={"/app/dashboard"}>Dashboard</Link>
			</Button>
		</div>
	)
}

export default HomePage
