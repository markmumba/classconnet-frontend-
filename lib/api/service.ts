
import axios, {AxiosInstance} from "axios";
import {LoginData, RegisterResponse, RegistrationData} from "@/lib/api/types";

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
    register: async (registrationData:FormData):Promise<RegisterResponse> => {

        const response = await api.post('/auth/register/', registrationData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },
    login: async (loginData:LoginData):Promise<void> => {
        const response = await api.post('/auth/login/', loginData);
        return response.data;
    }
}
export const SchoolEndpoints = {
    getSchools: async ():Promise<void> => {
        const response = await api.get(`/public/schools/`);
        return response.data;
    },
    getDepartments: async (schoolId:string):Promise<void> => {
        const response = await api.get(`/public/departments/?school_id=${schoolId}`);
        return response.data;
    }
}