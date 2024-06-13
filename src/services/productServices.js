import apiClient from "../API/api-client";
export function getsuggestionsAPI(search){
    return apiClient.get(`/products/suggestions?search=${search}`)
}