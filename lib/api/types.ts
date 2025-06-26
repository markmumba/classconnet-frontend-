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
    school_id: string;
    graduation_year: string;
    role: string;
    picture: string;
}

export interface User extends BasicUser {
    school_name: string;
    quote: string;
    student_id: string;
    full_name: string;
    date_joined: string;
    career_path: string;
    sub_school: string;
    major: string;
}

export interface SubSchoolAdd {
    name: string;
    description: string;
    school_id?: string;
}

export interface SchoolList {
    id: number;
    name: string;
    full_email_domain: string;
    logo: string;
}
export interface SchoolDetails {
    id: number;
    name: string;
    full_email_domain: string;
    logo: string;
    location: string;
    phone: string;
    is_active: boolean;
    user_count: number;
    department_count: number;
    departments: SubSchoolList[];
}

export interface AddSchoolData {
    name: string;
    email_domain: string;
    location: string;
    phone: string;
    logo?: File;
}

export interface SubSchoolList {
    id: number;
    name: string;
    description?: string;
    is_active: boolean;
}
export interface SubSchool {
    id: number;
    name: string;
    description?: string;
    school: string;
    school_name: string;
    is_active: string;
}

