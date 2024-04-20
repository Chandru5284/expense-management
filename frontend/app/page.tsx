"use client"

import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

import { useLoginModal } from "@/hooks/use-login-modal"
import { useEffect } from "react"

const DialogDemo = () => {

	const onOpen = useLoginModal((state) => state.onOpen);
	const isOpen = useLoginModal((state) => state.isOpen);
	const onClose = useLoginModal((state) => state.onClose);

	console.log(isOpen)

	useEffect(() => {
		if (!isOpen) {
			onOpen();
		}
	}, [isOpen, onOpen]);

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogTrigger asChild>
				<Button variant="outline">Edit Profile</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-center text-4xl font-bold">Login</DialogTitle>
					<DialogDescription className="text-center text-xl">
						Welcome back.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="space-y-1">
						<Label htmlFor="username" className="text-right">
							Username
						</Label>
						<Input
							id="username"
							type="text"
							className="col-span-3"
						/>
					</div>
					<div className="space-y-1">
						<Label htmlFor="password" className="text-right">
							Password
						</Label>
						<Input
							id="password"
							type="password"
							className="col-span-3"
						/>
					</div>
				</div>
				<p className="text-sm  dark:text-gray-300 text-[#353f4f] text-center  font-semibold">
					Don&apos;t have an account?
					<Link
						href="/auth/signup"
						className="pl-1 text-[#e34953] hover:text-[#e34953eb]  transition duration-200 ease-in-out text-sm hover:underline"
					>Signup
					</Link>
				</p>
				<DialogFooter>
					<Button type="submit" className="w-full">Login</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default DialogDemo

