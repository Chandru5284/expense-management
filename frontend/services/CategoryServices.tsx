import axios from './core'
import { handleResponse, handleError } from './response'


// get category list
const getAll = async (member_slug: any, type = "" as any) => {
    return await axios.get(`/api/v1/expense/category/${member_slug}/?type=${type}`).then(handleResponse).catch(handleError)
}

// create category record
const create = async (member_slug: any, record: null | any) => {
    return await axios.post(`/api/v1/expense/category/create/${member_slug}/`, record)
    // .then(handleResponse).catch(handleError)
}

// update category record
const update = async (slug: string, record: null | any) => {
    return await axios.put(`/api/v1/expense/category/${slug}/update/`, record).then(handleResponse).catch(handleError)
}

// get category record
const show = async (slug: string) => {
    return await axios.get(`/api/v1/expense/category/${slug}/show/`).then(handleResponse).catch(handleError)
}

// delete category list
const discard = async (slug: string) => {
    return await axios.delete(`/api/v1/expense/category/${slug}/delete/`).then(handleResponse).catch(handleError)
}



const CategoryServices = {
    getAll,
    create,
    update,
    show,
    discard,
}

export default CategoryServices