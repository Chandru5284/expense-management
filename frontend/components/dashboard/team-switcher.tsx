"use client"

import React, { useContext, useEffect } from "react"
import {
    CaretSortIcon,
    CheckIcon,
    PlusCircledIcon,
} from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import CreateMember from "./CreateMember"
import { useParams, usePathname, useRouter } from "next/navigation"
import { MemberServices } from "@/services"
import { useQuery } from "@tanstack/react-query"
import GlobalContext from "@/context/GlobalContext"


export default function TeamSwitcher() {

    const query = useParams()
    const router = useRouter()
    const gContext: any = useContext(GlobalContext);


    const [open, setOpen] = React.useState(false)
    const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false)
    const [selectedTeam, setSelectedTeam] = React.useState<any>()

    const fetchMembersList = () => {
        const data = MemberServices.getAll().then((response) => {
            if (response?.results?.length < 1) {
                gContext?.set_require_member("true")
            }
            return response.results
        }).catch((error) => { })
        return data
    }

    const { data: members } = useQuery({
        queryKey: ['membersList'],
        queryFn: fetchMembersList
    })

    useEffect(() => {
        const currentMember = members?.find((member: any) => member?.slug === query.memberId);
        setSelectedTeam(currentMember);
    }, [members]);

    return (
        <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        aria-label="Select a team"
                        className={cn("w-[200px] justify-between")}
                    >
                        <Avatar className="mr-2 h-5 w-5">
                            <AvatarImage
                                src={`https://avatar.vercel.sh/acme-inc.png`}
                                alt={"Members"}
                                className="grayscale"
                            />
                            <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        {selectedTeam?.name}
                        <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandList>
                            <CommandGroup heading={"Members"}>
                                {members && members.map((team: any) => (
                                    <CommandItem
                                        key={team.slug}
                                        onSelect={() => {
                                            setSelectedTeam(team)
                                            setOpen(false)
                                            router.push(`/app/${team.slug}/dashboard`)
                                        }}
                                        className="text-sm"
                                    >
                                        <Avatar className="mr-2 h-5 w-5">
                                            <AvatarImage
                                                src={`https://avatar.vercel.sh/acme-inc.png`}
                                                alt={team.name}
                                                className="grayscale"
                                            />
                                            <AvatarFallback>SC</AvatarFallback>
                                        </Avatar>
                                        {team.name}
                                        <CheckIcon
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                selectedTeam?.name === team.name
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                        <CommandSeparator />
                        <CommandList>
                            <CommandGroup>
                                <DialogTrigger asChild>
                                    <CommandItem
                                        onSelect={() => {
                                            setOpen(false)
                                            setShowNewTeamDialog(true)
                                        }}
                                    >
                                        <PlusCircledIcon className="mr-2 h-5 w-5" />
                                        Create Member
                                    </CommandItem>
                                </DialogTrigger>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <CreateMember open={showNewTeamDialog} setOpen={setShowNewTeamDialog} />
        </Dialog>
    )
}