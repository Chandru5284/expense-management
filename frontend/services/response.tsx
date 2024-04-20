

export function handleResponse(response: null | any) {
    if (response.results) {
        return response.results
    }
    if (response.data) {
        return response.data;
    }
    return response
}

export function handleError(error: null | any) {
    // if(error.response.status === 404) {
    //     console.log("404")
    //     navigate('/404')
    // }
    // if(error.response.status === 403){
    //     console.log("403")
    // }
    // if(error.response.status === 503){
    //     console.log("503")
    // }
    throw error
}