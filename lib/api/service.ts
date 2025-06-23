
import axios, {AxiosInstance} from "axios";
import {LoginData, RegistrationData} from "@/lib/api/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


function getHeader() {
    const token:string|null = localStorage.getItem('token')

    return {
        Authorization: `Bearer ${token}`
    }
}


const api:AxiosInstance = axios.create({
    baseURL:BASE_URL,
    timeout:1000,
    headers:{'Content-Type':"application/json"}
})


export const AuthEndpoints = {
    register: async (registrationData:RegistrationData):Promise<void> => {
        const response = await api.post('/auth/register/', registrationData);
        return response.data;
    },
    login: async (loginData:LoginData):Promise<void> => {
        const response = await api.post('/auth/login/', loginData);
        return response.data;
    }
}