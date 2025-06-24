export interface RegistrationData {
    school: string;
    sub_school: string;
    email: string;
    first_name: string;
    last_name: string;
    student_id: string;
    graduation_year: string;
    password: string;
    major: string;
    career_path: string;
    quote: string;
    picture: File | null;
}

export interface RegisterResponse {
    refresh: string;
    access: string;
    user: User;
}


export interface LoginData {
    email: string;
    password: string;
}
export interface LoginResponse {
    refresh: string;
    access: string;
    user: User;
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

export interface SchoolList {
    id: number;
    name: string;
    full_email_domain: string;
}

export interface DepartmentList {
    id: number;
    name: string;
}