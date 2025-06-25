"use client"
import { useQuery } from "@tanstack/react-query";
import { SchoolEndpoints, UserEndpoints } from "@/lib/api/service";
import { Building, Users, UserCheck, Plus, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SuperAdminDashboard() {

    const router = useRouter();

    // Fetch schools data
    const { data: schools, isLoading: schoolsLoading } = useQuery({
        queryKey: ['getSchools'],
        queryFn: () => SchoolEndpoints.getSchools(),
    });

    // Fetch all users data
    const { data: users, isLoading: usersLoading } = useQuery({
        queryKey: ['getAllUsers'],
        queryFn: UserEndpoints.getUserGraduateClass,
    });

    
    // Calculate statistics
    const totalSchools = schools?.length || 0;
    const totalAdmins = users?.filter(user => user.role === 'admin').length || 0;
    const totalStudents = users?.filter(user => user.role === 'student').length || 0;

    // Get recently added schools (last 3)
    const recentSchools = schools?.slice(0, 3) || [];


    if (schoolsLoading || usersLoading) {
        return (
            <div className="min-h-screen ">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading dashboard...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen ">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Super Admin Dashboard</h1>
                    <p className="text-gray-600">Manage schools, admins, and monitor system activity</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Total Schools</CardTitle>
                            <Building className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{totalSchools}</div>
                            <p className="text-xs text-gray-500">Active educational institutions</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">School Admins</CardTitle>
                            <UserCheck className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{totalAdmins}</div>
                            <p className="text-xs text-gray-500">Administrative users</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Total Students</CardTitle>
                            <Users className="h-4 w-4 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{totalStudents}</div>
                            <p className="text-xs text-gray-500">Registered students</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recently Added Schools */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">Recently Added Schools</h2>
                        <Button
                            onClick={() => router.push('/dashboard/add-school')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 hover:scale-105"
                        >
                            <Plus className="h-4 w-4" />
                            Add School
                        </Button>
                    </div>

                    {recentSchools.length === 0 ? (
                        <Card className="bg-white shadow-lg">
                            <CardContent className="p-8 text-center">
                                <Building className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No schools yet</h3>
                                <p className="text-gray-500 mb-4">Get started by adding your first school</p>
                                <Button
                                    onClick={() => router.push('/dashboard/add-school')}
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add First School
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {recentSchools.map((school) => (
                                <Card key={school.id} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 group">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                {school.name}
                                            </CardTitle>
                                            <Building className="h-5 w-5 text-blue-600" />
                                        </div>
                                        {school.logo && (
                                            <div className="flex items-center justify-center mt-3">
                                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                                                    <Image
                                                        src={school.logo}
                                                        alt={`${school.name} logo`}
                                                        width={64}
                                                        height={64}
                                                        className="object-cover w-full h-full"
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.style.display = 'none';
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <MapPin className="h-4 w-4 mr-2" />
                                            <span>{school.full_email_domain}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            <span>Recently added</span>
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="w-full mt-3 border-blue-200 text-blue-600 hover:bg-blue-50"
                                            onClick={() => router.push(`/dashboard/school/${school.id}`)}
                                        >
                                            View Details
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <Card className="bg-white shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Button
                                variant="outline"
                                className="h-20 flex flex-col items-center justify-center space-y-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                                onClick={() => router.push('/dashboard/add-school')}
                            >
                                <Plus className="h-6 w-6" />
                                <span className="text-sm">Add School</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="h-20 flex flex-col items-center justify-center space-y-2 border-green-200 text-green-600 hover:bg-green-50"
                            >
                                <UserCheck className="h-6 w-6" />
                                <span className="text-sm">Manage Admins</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="h-20 flex flex-col items-center justify-center space-y-2 border-purple-200 text-purple-600 hover:bg-purple-50"
                            >
                                <Users className="h-6 w-6" />
                                <span className="text-sm">View Students</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="h-20 flex flex-col items-center justify-center space-y-2 border-orange-200 text-orange-600 hover:bg-orange-50"
                            >
                                <Building className="h-6 w-6" />
                                <span className="text-sm">System Settings</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}