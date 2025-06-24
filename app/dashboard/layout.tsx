import { all } from "@/lib/utils";
import { ProtectedRoute } from "../protected";
import Navbar from "@/components/custom-ui/shared/navbar";

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <ProtectedRoute allowedRoles={all}>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <Navbar />
                {children}
            </div>
        </ProtectedRoute>
    );
}