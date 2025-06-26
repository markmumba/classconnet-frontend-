"use client"
import { ProtectedRoute } from "@/app/protected";
import FullPageSpinner from "@/components/custom-ui/shared/fullpagespinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SubSchoolEndpoints } from "@/lib/api/service";
import { admin, super_admin } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";

interface DepartmentPageProps {
    params: Promise<{
        id: string
    }>
}

export default function ProtectedDepartmentPage({ params }: DepartmentPageProps) {
    const { id } = use(params)
    return (
        <ProtectedRoute allowedRoles={[admin, super_admin]}>
            <Department id={id} />
        </ProtectedRoute>
    )
}

function Department({ id }: { id: string }) {     
    const { data: department, isPending } = useQuery({
        queryKey: ["department", id],
        queryFn: () => SubSchoolEndpoints.getSubSchool(id),
        enabled: !!id
    })

    if (isPending) return <FullPageSpinner />

    return (
        <div className="min-h-screen ">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{department?.name}</h1>
                            <p className="text-gray-600 mt-2">Department Overview</p>
                        </div>
                        <span className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium ${
                            department?.is_active 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                            {department?.is_active ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                </div>

                {/* School Info */}
                <Card className="bg-white shadow-lg mb-8">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-900">Department Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-600 mb-2">Description</h3>
                            <p className="text-gray-800">{department?.description}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-600 mb-2">School</h3>
                            <p className="text-gray-800">{department?.school_name}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Total Students</CardTitle>
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-blue-600">100</span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">100</div>
                            <p className="text-xs text-gray-500">Enrolled students</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Faculty Members</CardTitle>
                            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                <span className="text-green-600">15</span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">15</div>
                            <p className="text-xs text-gray-500">Teaching staff</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Courses</CardTitle>
                            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                                <span className="text-purple-600">8</span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">8</div>
                            <p className="text-xs text-gray-500">Active courses</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}       