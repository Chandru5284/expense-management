import React from 'react'

const OverlayLoader = () => {
    return (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
            <div className="relative">
                <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
                </div>
            </div>
        </div>
    )
}

export default OverlayLoader
