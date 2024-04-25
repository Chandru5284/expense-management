import React from 'react'

// import components
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import TransactionCreateForm from '../transaction-form/TransactionCreateForm'

const TransactionFormModal = ({ open, setOpen }: any) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <TransactionCreateForm />
            </DialogContent>
        </Dialog>
    )
}

export default TransactionFormModal



