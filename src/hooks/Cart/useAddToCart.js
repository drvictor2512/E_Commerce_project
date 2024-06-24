import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../API/api-client";
import { ToastContainer, toast } from 'react-toastify'
const useAddToCart = () => {
    const quertyClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, quantity}) => apiClient.post(`/cart/${id}`, {quantity}).then(res => res.data),
        onSuccess: () => {
            quertyClient.invalidateQueries({
                queryKey: ["cart"]
            }),
            toast.success("Products added sucessfully")
        }
    })
}
export default useAddToCart;