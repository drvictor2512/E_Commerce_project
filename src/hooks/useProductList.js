import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../API/api-client";

const useProductList = (query) => {
    const fetchFuntion = ({pageParams = 1}) => apiClient.get("/products", {params : {...query, page: pageParams}}).then(res => res.data)
    return useInfiniteQuery({
        queryKey : ["products", query],
        queryFn : fetchFuntion,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.currentPage < lastPage.totalPages ?  lastPage.currentPage + 1 : null;
        }
    })
}

export default useProductList;