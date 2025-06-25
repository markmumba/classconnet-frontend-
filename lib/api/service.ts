import axios, {AxiosInstance} from "axios";
import {AddSchoolData, DepartmentList, LoginData, LoginResponse, RegisterResponse, RegistrationData, SchoolList, User} from "@/lib/api/types";
import useAuthStore from "../store";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, 
    headers: {'Content-Type': "application/json"},
})

api.interceptors.request.use(
    (config) => {
        const { access } = useAuthStore.getState();
        if (access) {
            config.headers.Authorization = `Bearer ${access}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const { logout } = useAuthStore.getState();
            logout();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const AuthEndpoints = {
    register: async (registrationData: FormData): Promise<RegisterResponse> => {
        const response = await api.post('/auth/register/', registrationData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },
    login: async (loginData: LoginData): Promise<LoginResponse> => {
        const response = await api.post('/auth/login/', loginData);
        return response.data;
    }
}

export const SchoolEndpoints = {
    getSchools: async (): Promise<SchoolList[]> => {
        const response = await api.get(`/public/schools/`);
        return response.data;
    },
    getDepartments: async (schoolId: string): Promise<DepartmentList[]> => {
        const response = await api.get(`/public/departments/?school_id=${schoolId}`);
        return response.data;
    },
    addSchool: async (data: AddSchoolData): Promise<SchoolList> => {
        const response = await api.post(`/schools/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }
}

export const UserEndpoints = {
    getUserGraduateClass: async (): Promise<User[]> => {
        const response = await api.get(`/users/`);
        return response.data;
    },
    getUserById: async (id: string): Promise<User> => {
        const response = await api.get(`/users/${id}/`);
        return response.data;
    }
}