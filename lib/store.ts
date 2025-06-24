import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "./api/types";


interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    refresh: string | null;
    access: string | null;
    login: (user: User, refresh: string, access: string) => void;
    logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    refresh: null,
    access: null,
    login: (user: User, refresh: string, access: string) => set({isAuthenticated: true, user, refresh, access}),
    logout: () => set({isAuthenticated: false, user: null, refresh: null, access: null}),
}))

export default useAuthStore;