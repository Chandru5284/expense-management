import axios from './core'
import { handleResponse, handleError } from './response'


// get total transaction
const getTotalTransactions = async (member_slug: any) => {
    return await axios.get(`/api/v1/dashboard/${member_slug}/`).then(handleResponse).catch(handleError)
}

// get chart values
const getChartValues = async (member_slug: any) => {
    return await axios.get(`/api/v1/dashboard/${member_slug}/chart/`).then(handleResponse).catch(handleError)
}

// download excel
const downloadExcel = async (member_slug: any) => {
    const record = {
        start_date: '2024-04-25',
        end_date: '2024-04-27'
    } as any

    return await axios.post(`/api/v1/dashboard/${member_slug}/download-excel/`, record).then(handleResponse).catch(handleError)
}

const DashboardServices = {
    getTotalTransactions,
    getChartValues,
    downloadExcel
}

export default DashboardServices