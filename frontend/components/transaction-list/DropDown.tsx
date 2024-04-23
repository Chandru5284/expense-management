
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// import icons
import { CiEdit } from "react-icons/ci"
import { MdDeleteOutline } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useTransactionRecord } from "@/hooks/use-transaction-record";

export function Dropdown({ slug, fetchRecord }: any) {

    const isEdit = useTransactionRecord((state) => state.isEdit);
    const setIsEdit = useTransactionRecord((state) => state.setIsEdit);

    const onHandleClick = () => {
        fetchRecord(slug)
        setIsEdit(true)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className='absolute top-1.5 right-1.5'>
                    <BsThreeDotsVertical />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44 absolute right-0">
                <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer" onClick={onHandleClick}>
                        <CiEdit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                        <MdDeleteOutline className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
