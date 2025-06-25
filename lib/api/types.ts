export enum Role {
    STUDENT = "student",
    ADMIN = "admin",
    SUPER_ADMIN = "super_admin",
}
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
    user: BasicUser;
}


export interface LoginData {
    email: string;
    password: string;
}
export interface LoginResponse {
    refresh: string;
    access: string;
    user: BasicUser;
}

export interface BasicUser {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    school_id:string;
    graduation_year:string;
    role:string;
    picture:string;
}

export interface User extends BasicUser {
    school_name:string;
    quote:string;
    student_id:string;
    department:string;
    full_name:string;
    date_joined:string;
    career_path:string;
    sub_school:string;
    major:string;
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