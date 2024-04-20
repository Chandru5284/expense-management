import axios from './core'
import { handleResponse, handleError } from './response'


// get member list
const getAll = async () => {
    return await axios.get(`/api/v1/expense/member/`).then(handleResponse).catch(handleError)
}

// create member record
const create = async (record: null | any) => {
    return await axios.post('/api/v1/expense/member/create/', record).then(handleResponse).catch(handleError)
}

// update member record
const update = async (slug: string, record: null | any) => {
    return await axios.put(`/api/v1/expense/member/${slug}/update/`, record).then(handleResponse).catch(handleError)
}

// get member record
const show = async (slug: string) => {
    return await axios.get(`/api/v1/expense/member/${slug}/show/`).then(handleResponse).catch(handleError)
}

// delete member list
const discard = async (slug: string) => {
    return await axios.delete(`/api/v1/expense/member/${slug}/delete/`).then(handleResponse).catch(handleError)
}



const MemberServices = {
    getAll,
    create,
    update,
    show,
    discard,
}

export default MemberServices