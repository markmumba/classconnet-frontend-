"use client"
import useAuthStore from "@/lib/store";
import UserDashboard from "@/components/custom-ui/dashboard/user/userdashboard";
import AdminDashboard from "@/components/custom-ui/dashboard/school admin/admindashboard";
import SuperAdminDashboard from "@/components/custom-ui/dashboard/super admin/superdashboard";

export default function DashboardPage() {

    const {user }=useAuthStore();

    function getDashboard(){
        switch(user?.role){
            case "student":
                return <UserDashboard />
            case "admin":
                return <AdminDashboard />
            case "super_admin":
                return <SuperAdminDashboard />
            default:
                return <div>No dashboard found</div>
        }
    }
    return (
        <div>
            {getDashboard()}
        </div>
    )
}