import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateCartProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, type}) => apiClient.patch(`/cart/${type}/${id}`).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"]
                
            });
        }
    })
}
export default useUpdateCartProduct;