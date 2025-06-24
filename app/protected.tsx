'use client';
import useAuthStore from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}

export function ProtectedRoute({ children, allowedRoles = [] }: ProtectedRouteProps) {
    const router = useRouter();
    const {  user,access } = useAuthStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleHydration = () => {
            setIsLoading(false);

            if (!access) {
                router.push('/login');
                return;
            }

            if (allowedRoles.length > 0 && user?.role && !allowedRoles.includes(user?.role)) {
                router.push('/unauthorized');
                return;
            }
        };

        if (useAuthStore.persist.hasHydrated()) {
            handleHydration();
        } else {
            useAuthStore.persist.onHydrate(handleHydration);
        }
    }, [access, user, router, allowedRoles]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!access) {
        return null;
    }

    if (allowedRoles.length > 0 && user?.role && !allowedRoles.includes(user?.role)) {
        return null;
    }

    return <>{children}</>;
}