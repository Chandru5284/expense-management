"use client"
import { CookiesProvider } from "react-cookie"

const CookiesProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <CookiesProvider>
            {children}
        </CookiesProvider>
    )
}

export default CookiesProviders