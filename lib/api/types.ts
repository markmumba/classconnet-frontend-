export interface RegistrationData {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    sub_school: number;
    career_path: string;
    quote: string;
    picture: File;
}


export interface LoginData {
    email: string;
    password: string;
}

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    sub_school: number;
    career_path: string;
    quote: string;
}