'use client';
import { useEffect } from "react";
import useAuthStore from "@/lib/store";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}

export function ProtectedRoute({ children, allowedRoles = [] }: ProtectedRouteProps) {
    const router = useRouter();
    const { access, user, hydrated } = useAuthStore();

    useEffect(() => {
        if (!hydrated) return;

        if (!access) {
            router.replace('/login');
        } else if (allowedRoles.length > 0 && user?.role && !allowedRoles.includes(user.role)) {
            router.replace('/unauthorized');
        }
    }, [hydrated, access, user, allowedRoles, router]);

    if (!hydrated) {
        return <div className="p-4">Loading session...</div>;
    }

    if (!access) return null;
    if (allowedRoles.length > 0 && user?.role && !allowedRoles.includes(user.role)) {
        return null;
    }

    return <>{children}</>;
}
