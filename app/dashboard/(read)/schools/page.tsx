import { admin, super_admin } from "@/lib/utils";
import { ProtectedRoute } from "@/app/protected";
import { SchoolEndpoints } from "@/lib/api/service";
import { useQuery } from "@tanstack/react-query";
import FullPageSpinner from "@/components/custom-ui/shared/fullpagespinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building } from "lucide-react";



export default function ProtectedSchoolsPage() {
    return (
        <ProtectedRoute allowedRoles={[ super_admin]}>
            <Schools />
        </ProtectedRoute>
    )
}               

function Schools() {
    const { data: schools, isPending } = useQuery({
        queryKey: ["schools"],
        queryFn: SchoolEndpoints.getSchools
    })

    if (isPending) return <FullPageSpinner />

    return (
        <div className="min-h-screen py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Schools</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">  
                {schools?.map((school) => (
                    <Card key={school.id} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">{school.name}</CardTitle>
                            <Building className="h-4 w-4 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{school.full_email_domain}</div>
                            <p className="text-xs text-gray-500">School email domain</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}