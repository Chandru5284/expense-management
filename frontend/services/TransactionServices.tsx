import axios from './core'
import { handleResponse, handleError } from './response'


// get transaction list
const getAll = async (member_slug: any, transaction_type = "" as any) => {
    return await axios.get(`/api/v1/expense/${member_slug}/?transaction_type=${transaction_type}`).then(handleResponse).catch(handleError)
}

// create transaction record
const create = async (member_slug: any, record: null | any) => {
    return await axios.post(`/api/v1/expense/create/${member_slug}/`, record).then(handleResponse).catch(handleError)
}

// update transaction record
const update = async (slug: string, record: null | any) => {
    return await axios.put(`/api/v1/expense/${slug}/update/`, record).then(handleResponse).catch(handleError)
}

// get transaction record
const show = async (slug: string) => {
    return await axios.get(`/api/v1/expense/${slug}/show/`).then(handleResponse).catch(handleError)
}

// delete transaction list
const discard = async (slug: string) => {
    return await axios.delete(`/api/v1/expense/${slug}/delete/`).then(handleResponse).catch(handleError)
}



const TransactionServices = {
    getAll,
    create,
    update,
    show,
    discard,
}

export default TransactionServices