import apiClient from '../API/api-client';
import { useQuery } from '@tanstack/react-query';
const useData = (url, customConfig = {}, queryKey, staleTime = 300_000) => {
  const fetchFn = () => apiClient.get(url, customConfig).then(res => res.data);
  return useQuery({
    queryKey : queryKey,
    queryFn : fetchFn,
    staleTime: staleTime,
  })
  // useData hooks
  //   const [data, setData] = useState(null);
  //   const [errors, setErrors] = useState("");
  //   const [isLoading, setIsLoading] = useState(false);
  //   useEffect(() => {
  //     setIsLoading(true);
  //   apiClient.get(url, customConfig).then(res => {
  //     if(url === '/products' && data && data.products && customConfig.params.page !== 1){
  //         setData(prev => ({
  //           ...prev,
  //           products : [...prev.products, ...res.data.products]
  //         }));
  //     }
  //     else{
  //       setData(res.data)
  //     }
  //     setIsLoading(false)
  //   })
  //   .catch(err => {
  //     setErrors(err.message)
  //     setIsLoading(false)
  //   })
  // },deps ? deps : [])
  // return {data, errors, isLoading};
}

export default useData