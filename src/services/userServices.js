import apiClient from "../API/api-client";
import {jwtDecode} from "jwt-decode";
const tokenName = "token";
export async function signup(user, profile){
    const body = new FormData();
    body.append("name", user.name);
    body.append("email", user.email);
    body.append("password", user.password);
    body.append("deliveryAddress", user.deliveryAddress);
    body.append("profilePic", profile);
    return apiClient.post("/user/signup", body)
} 

export async function login(user){
    return apiClient.post("/user/login", user)
}
export function getUser() {
    try {
        const jwt = localStorage.getItem(tokenName);
        return jwtDecode(jwt);
    } catch (error) {
        return null;
    }
}

export function getJwt() {
    return localStorage.getItem(tokenName);
}
