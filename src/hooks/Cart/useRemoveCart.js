import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../API/api-client";
const useRemoveCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id}) => apiClient.patch(`/cart/remove/${id}`).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"]
            })
            
        }
    })
}
export default useRemoveCart;