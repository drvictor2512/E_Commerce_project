import React, {useEffect, useState} from 'react'
import apiClient from '../API/api-client';
const useData = (url, customConfig, deps) => {
    const [data, setData] = useState(null);
    const [errors, setErrors] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
      setIsLoading(true);
    apiClient.get(url, customConfig).then(res => {
      if(url === '/products' && data && data.products && customConfig.params.page !== 1){
          setData(prev => ({
            ...prev,
            products : [...prev.products, ...res.data.products]
          }));
      }
      else{
        setData(res.data)
      }
      setIsLoading(false)
    })
    .catch(err => {
      setErrors(err.message)
      setIsLoading(false)
    })
  },deps ? deps : [])
  return {data, errors, isLoading};
}

export default useData