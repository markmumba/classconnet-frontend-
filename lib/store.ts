import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { BasicUser, User } from "./api/types";

interface AuthState {
    isAuthenticated: boolean;
    user: BasicUser | null;
    refresh: string | null;
    access: string | null;
    login: (user: BasicUser, refresh: string, access: string) => void;
    logout: () => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            refresh: null,
            access: null,
            login: (user: BasicUser, refresh: string, access: string) => set({isAuthenticated: true, user, refresh, access}),
            logout: () => set({isAuthenticated: false, user: null, refresh: null, access: null}),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)

export default useAuthStore;