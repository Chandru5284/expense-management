import axios from './core'
import { handleResponse, handleError } from './response'

// signup
const signUp = async (record: any | null) => {
    return await axios.post('/api/v1/auth/signup/', record).then(handleResponse).catch(handleError)
}

// login
const login = async (record: any | null) => {
    return await axios.post('/api/v1/auth/login/', record).then(handleResponse).catch(handleError)
}

// forgot password
const forgotPasswordEmail = async (record: any | null) => {
    return await axios.post('/api/v1/auth/forgotPassword/', record).then(handleResponse).catch(handleError)
}

// reset password
const resetPassword = async (record: any | null) => {
    return await axios.post('/api/v1/auth/resetPassword/', record).then(handleResponse).catch(handleError)
}

// profile view
const profileView = async () => {
    return await axios.get(`/api/v1/auth/2/userProfile/`).then(handleResponse).catch(handleError)
}

// change password
const changePassword = async (record: any | null) => {
    return await axios.put(`/api/v1/auth/changePassword/`, record).then(handleResponse).catch(handleError)
}

// Verify Email
const verifyEmail = async (record: {}) => {
    return await axios.post(`/api/v1/auth/verify-email/`, record).then(handleResponse).catch(handleError);
};

// Email Verify
const emailVerify = async () => {
    return await axios.post(`/api/v1/auth/email-verify/`).then(handleResponse).catch(handleError);
};

// get user profile
const userProfile = async () => {
    return await axios.get(`/api/v1/user/my-profile`).then(handleResponse).catch(handleError);
};

// edit user profile
const editUserProfile = async (record:any) => {
    return await axios.put(`/api/v1/user/my-profile/update`, record).then(handleResponse).catch(handleError);
};

const socialLogin = async (record:any) => {
    return await axios.put(`/api/v1/auth/login/social/`, record).then(handleResponse).catch(handleError);
};


const AuthenticationServices = {

    signUp,
    login,
    forgotPasswordEmail,
    resetPassword,
    profileView,
    verifyEmail,
    changePassword,
    emailVerify,
    userProfile,
    editUserProfile,
    socialLogin
}

export default AuthenticationServices