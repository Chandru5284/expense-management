"use client";

import { useEffect } from "react";

// import hooks
import { useLoginModal } from "@/hooks/use-login-modal"

// import components
import CreateMember from "@/components/dashboard/CreateMember";
import CreateCategory from "../dashboard/CreateCategory";
import { useCategoryModal } from "@/hooks/use-category-modal";

const CreateMemberModal = () => {

    const onOpen = useLoginModal((state) => state.onOpen);
    const isOpen = useLoginModal((state) => state.isOpen);
    const onClose = useLoginModal((state) => state.onClose);

    const onOpenCategoryModal = useCategoryModal((state) => state.onOpen);
    const isOpenCategoryModal = useCategoryModal((state) => state.isOpen);
    const onCloseCategoryModal = useCategoryModal((state) => state.onClose);

    useEffect(() => {
        if (!isOpen) {
            onOpen();
        }
    }, [isOpen, onOpen]);

    return (
        <div>
            <CreateMember open={isOpen} setOpen={onClose} />
            <CreateCategory open={isOpenCategoryModal} setOpen={onCloseCategoryModal} />
            {/* <CreateMember open={isOpen} setOpen={onClose} /> */}
        </div>
    )
}

export default CreateMemberModal
