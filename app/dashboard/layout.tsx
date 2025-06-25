'use client'
import Navbar from "@/components/custom-ui/shared/navbar";
import { ProtectedRoute } from "../protected";
import { all } from "@/lib/utils";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute allowedRoles={all}>

            <div className="min-h-screen">
                <Navbar />
                {children}
            </div>
        </ProtectedRoute>
    );
}