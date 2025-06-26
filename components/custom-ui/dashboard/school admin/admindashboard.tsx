import { useQuery } from "@tanstack/react-query";
import { SchoolEndpoints, SubSchoolEndpoints, UserEndpoints } from "@/lib/api/service";
import FullPageSpinner from "@/components/custom-ui/shared/fullpagespinner";
import useAuthStore from "@/lib/store";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Users, UserCheck, Plus, Calendar, MapPin, Mail, Phone, GraduationCap, BookOpen, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
    const { user } = useAuthStore();
    const router = useRouter();

    const { data: school, isPending: isPendingSchool } = useQuery({
        queryKey: ["school"],
        queryFn: () => SchoolEndpoints.getSchoolDetails(user?.school_id || ""),
        enabled: !!user?.school_id
    })

    const { data: departments, isPending: isPendingDepartments } = useQuery({
        queryKey: ["departments", user?.school_id],
        queryFn: SubSchoolEndpoints.getSubSchools,
        enabled: !!user?.school_id
    })

    const { data: admins, isPending: isPendingAdmins } = useQuery({
        queryKey: ["admins", user?.school_id],
        queryFn: () => SchoolEndpoints.getSchoolAdmins(user?.school_id || ""),
        enabled: !!user?.school_id
    })

    const threedepartments = departments?.slice(0, 3)

    if (isPendingSchool) return <FullPageSpinner />

    const totalStudents = school?.user_count || 0;
    const totalAdmins = admins?.length || 0;
    const totalDepartments = school?.department_count || 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        {school?.logo && (
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-white shadow-lg">
                                <Image
                                    src={school.logo}
                                    alt={school.name}
                                    width={64}
                                    height={64}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        )}
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{school?.name}</h1>
                            <p className="text-gray-600">School Administration Dashboard</p>
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Total Students</CardTitle>
                            <GraduationCap className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{totalStudents}</div>
                            <p className="text-xs text-gray-500">Enrolled students</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Administrators</CardTitle>
                            <UserCheck className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{totalAdmins}</div>
                            <p className="text-xs text-gray-500">School staff</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Departments</CardTitle>
                            <Building className="h-4 w-4 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{totalDepartments}</div>
                            <p className="text-xs text-gray-500">Academic departments</p>
                        </CardContent>
                    </Card>
                </div>

                {/* School Information */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <Link href={`/dashboard/school/${school?.id}`} >
                    <Card className="bg-white shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-gray-900">School Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center text-sm text-gray-600">
                                <Mail className="h-4 w-4 mr-3" />
                                <span>{school?.full_email_domain}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <MapPin className="h-4 w-4 mr-3" />
                                <span>{school?.location || 'Location not specified'}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <Phone className="h-4 w-4 mr-3" />
                                <span>{school?.phone || 'Phone not specified'}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <Users className="h-4 w-4 mr-3" />
                                <span>{school?.user_count} Total Users</span>
                            </div>
                        </CardContent>
                    </Card>
                    </Link>

                    <Card className="bg-white shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <Button
                                    variant="outline"
                                    className="h-16 flex flex-col items-center justify-center space-y-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                                >
                                    <Users className="h-5 w-5" />
                                    <span className="text-sm">Manage Students</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-16 flex flex-col items-center justify-center space-y-2 border-green-200 text-green-600 hover:bg-green-50"
                                >
                                    <Building className="h-5 w-5" />
                                    <span className="text-sm">Departments</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-16 flex flex-col items-center justify-center space-y-2 border-purple-200 text-purple-600 hover:bg-purple-50"
                                >
                                    <BookOpen className="h-5 w-5" />
                                    <span className="text-sm">Reports</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-16 flex flex-col items-center justify-center space-y-2 border-orange-200 text-orange-600 hover:bg-orange-50"
                                >
                                    <Calendar className="h-5 w-5" />
                                    <span className="text-sm">Events</span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Departments Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">Departments</h2>

                        <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => router.push("/dashboard/add-department")}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Department
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => router.push("/dashboard/departments")}>
                            <Eye className="h-4 w-4 mr-2" />
                            View All
                        </Button>
                    </div>

                    {threedepartments && threedepartments.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {threedepartments.map((department) => (
                                <Card key={department.id} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-lg font-semibold text-gray-900">
                                                {department.name}
                                            </CardTitle>
                                            <Building className="h-5 w-5 text-blue-600" />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <p className="text-sm text-gray-600">
                                            {department.description || 'No description available'}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${department.is_active
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}>
                                                {department.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                            <Button variant="ghost" size="sm">
                                                <Users className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card className="bg-white shadow-lg">
                            <CardContent className="p-8 text-center">
                                <Building className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No departments yet</h3>
                                <p className="text-gray-500 mb-4">Get started by adding your first department</p>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add First Department
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Recent Activity */}
                <Card className="bg-white shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Users className="h-4 w-4 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">New student registration</p>
                                    <p className="text-xs text-gray-500">2 hours ago</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <Building className="h-4 w-4 text-green-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">Department updated</p>
                                    <p className="text-xs text-gray-500">1 day ago</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                    <BookOpen className="h-4 w-4 text-purple-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">Monthly report generated</p>
                                    <p className="text-xs text-gray-500">3 days ago</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}