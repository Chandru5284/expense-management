import React from 'react'

// import icons
import { GrTransaction } from "react-icons/gr";

const RecentTransactionEmptyState = () => {
    return (
        <div className="text-center">
            <GrTransaction className="mx-auto h-12 w-12 text-gray-400" />

            <h3 className="mt-2 text-sm font-medium text-gray-900">No Recent Transaction</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new transaction.</p>
            <div className="mt-6">
                <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#191919] hover:bg-[#303030] focus:outline-none focus:ring-2 focus:ring-offset-2 ">
                    <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                    </svg>
                    New Transaction
                </button>
            </div>
        </div>

    )
}

export default RecentTransactionEmptyState
