import { create } from 'zustand';

interface useTransactionRecordStore {
    record: any;
    isEdit: boolean;
    setIsEdit: (state: boolean) => void;
    setRecord: (state: any) => void;
    removeRecord: () => void;
}

export const useTransactionRecord = create<useTransactionRecordStore>((set) => ({
    record: {},
    isEdit: false,
    setIsEdit: (state) => set({ isEdit: state }),
    setRecord: (state) => set({ record: state }),
    removeRecord: () => set({ record: {} }),
}));
