"use client"

import React, { useState } from "react";
import { useCookies } from "react-cookie"

interface ProviderProps {
    children: React.ReactNode;
}

interface GlobalContextInterface {
    isLoggedIn: string | boolean | null;
    accessToken: string | null;
    refreshToken: string | null;
    userProfile: {} | null;
    userProfileImage: string | null;
    userProfileShortName: string | null;
    isRequireMember: string | boolean | null;
    login: (accessToken: string, refreshToken: string, userProfile: string) => void;
    logout: () => void;
    getUserProfile: () => {};
    set_require_member: (requireMember: any) => void
    remove_require_member: () => void
    cookie: any;

}

const GlobalContext = React.createContext<GlobalContextInterface | null>(null);


interface UserProfileInterface {
    slug: string | null;
    gender: string | null;
    mobile: string | null;
    phone: string | null;
    is_email_verified: boolean | null;
    is_mobile_verified: boolean | null;
    profile_image: {
        profile_image: string | null;
    },
    user_profile_short_name: string | null;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    is_active: boolean | null;
    date_joined: string | null;
    last_login: string | null;
}


const GlobalProvider: React.FC<ProviderProps> = ({ children }) => {


    const [cookie, setCookie, removeCookie] = useCookies(["is_logged_in", "access_token", "refresh_token", "user_profile", "user_profile_image", "user_profile_short_name", "require_member_info"])

    const [isLoggedIn, setIsLoggedIn] = React.useState<string | boolean | null>(typeof window !== 'undefined' ? localStorage.getItem('is_logged_in') : false);
    const [isRequireMember, setIsRequireMember] = React.useState<string | boolean | null>(typeof window !== 'undefined' ? localStorage.getItem('require_member_info') : false);
    const [accessToken, setAccessToken] = React.useState<string | null>(typeof window !== 'undefined' ? localStorage.getItem('access_token') : null);
    const [refreshToken, setRefreshToken] = React.useState<string | null>(typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null);
    const [userProfile, setUserProfile] = React.useState<{} | null>(typeof window !== 'undefined' ? localStorage.getItem('user_profile') : {});
    const [userProfileImage, setUserProfileImage] = React.useState<string | null>(typeof window !== 'undefined' ? localStorage.getItem('user_profile_image') : null);
    const [userProfileShortName, setUserProfileShortName] = React.useState<string | null>(typeof window !== 'undefined' ? localStorage.getItem('user_profile_short_name') : null);

    const getUserProfile = () => {
        const profileData = userProfile ? JSON.parse(userProfile as any) : {}
        return {
            "first_name": profileData?.first_name,
            "last_name": profileData?.last_name,
        }
    }

    const login = (accessToken: string, refreshToken: string, userProfile: string) => {

        const userProfileJsonData: UserProfileInterface | any | null = JSON.parse(JSON.stringify(userProfile))
        const userProfileImage: string = userProfileJsonData.profile_image?.profile_image || ""
        const userProfileShortName: string = (userProfileJsonData.first_name.substring(0, 1)).toUpperCase() + userProfileJsonData.last_name.substring(0, 1);

        localStorage.setItem("is_logged_in", "true");
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        localStorage.setItem("user_profile", JSON.stringify(userProfile));
        localStorage.setItem("user_profile_image", userProfileImage);
        localStorage.setItem("user_profile_short_name", userProfileShortName)


        // localStorage.setItem("user_profile_image", userProfile.profile_image ? userProfile.profile_image.profile_image : '');    

        setIsLoggedIn("true");
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setUserProfile(userProfile);
        setUserProfileImage(userProfileImage)
        setUserProfileShortName(userProfileShortName)


        const cookieConfig = {
            path: "/",
            maxAge: 43200, // Expires after 12hr
            sameSite: true,
        }

        setCookie("is_logged_in", false, cookieConfig)
        setCookie("access_token", accessToken, cookieConfig)
        setCookie("refresh_token", refreshToken, cookieConfig)
        setCookie("user_profile", JSON.stringify(userProfile), cookieConfig)
        setCookie("user_profile_image", userProfileImage, cookieConfig)
        setCookie("user_profile_short_name", userProfileShortName, cookieConfig)

    };

    const logout = () => {
        localStorage.removeItem("is_logged_in");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_profile");
        localStorage.removeItem("invoice");
        localStorage.removeItem("user_profile_image");
        localStorage.removeItem("user_profile_short_name");
        setIsLoggedIn(false);
        setAccessToken(null);
        setRefreshToken(null);
        setUserProfile(null);
        setUserProfileImage(null);
        setUserProfileShortName(null);

        removeCookie("is_logged_in", { path: '/' })
        removeCookie("access_token", { path: '/' })
        removeCookie("refresh_token", { path: '/' })
        removeCookie("user_profile", { path: '/' })
        removeCookie("user_profile_image", { path: '/' })
        removeCookie("user_profile_short_name", { path: '/' })

    };

    const set_require_member = (requireMember?: any) => {

        localStorage.setItem("require_member_info", requireMember)

        setIsRequireMember(requireMember);

        const cookieConfig = {
            path: "/",
            maxAge: 43200, // Expires after 12hr
            sameSite: true,
        }

        setCookie("require_member_info", requireMember, cookieConfig)
    };

    const remove_require_member = () => {
        localStorage.removeItem("require_member_info");

        setRefreshToken(null);

        removeCookie("require_member_info", { path: '/' })
    };

    return (
        <GlobalContext.Provider value={{
            isLoggedIn, accessToken, refreshToken,
            userProfile, userProfileImage, userProfileShortName, isRequireMember,
            login, logout, getUserProfile, set_require_member, remove_require_member,
            cookie,
        }}> {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContext;
export { GlobalProvider };