"use client";

import { useEffect } from "react";

// import hooks
import { useLoginModal } from "@/hooks/use-login-modal"

// import components
import CreateMember from "@/components/dashboard/CreateMember";

const CreateMemberModal = () => {

    const onOpen = useLoginModal((state) => state.onOpen);
    const isOpen = useLoginModal((state) => state.isOpen);
    const onClose = useLoginModal((state) => state.onClose);

    useEffect(() => {
        if (!isOpen) {
            onOpen();
        }
    }, [isOpen, onOpen]);

    return (
        <div>
            <CreateMember open={isOpen} setOpen={onClose} />
        </div>
    )
}

export default CreateMemberModal
