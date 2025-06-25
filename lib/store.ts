// store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { BasicUser } from "./api/types";

interface AuthState {
    isAuthenticated: boolean;
    user: BasicUser | null;
    refresh: string | null;
    access: string | null;
    hydrated: boolean;
    login: (user: BasicUser, refresh: string, access: string) => void;
    logout: () => void;
    setHydrated: () => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,
            refresh: null,
            access: null,
            hydrated: false,
            login: (user, refresh, access) =>
                set({ isAuthenticated: true, user, refresh, access }),
            logout: () =>
                set({ isAuthenticated: false, user: null, refresh: null, access: null }),
            setHydrated: () => set({ hydrated: true }),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                state?.setHydrated();
            },
        }
    )
);

export default useAuthStore;
