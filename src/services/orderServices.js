import apiClient from "../API/api-client";
export function checkoutAPI(){
   return apiClient.post('/order/checkout')
}