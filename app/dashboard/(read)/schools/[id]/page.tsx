"use client"

import { ProtectedRoute } from "@/app/protected"
import { admin, super_admin } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { SchoolEndpoints } from "@/lib/api/service"
import FullPageSpinner from "@/components/custom-ui/shared/fullpagespinner"
import { use } from "react"
import Image from "next/image"
import {
    ArrowLeft,
    Building,
    Mail,
    MapPin,
    Phone,
    Users,
    Calendar,
    Settings,
    Edit,
    Trash2,
    Plus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

interface SchoolPageProps {
    params: Promise<{ id: string }>;
}

export default function ProtectedSchoolPage({ params }: SchoolPageProps) {
    return (
        <ProtectedRoute allowedRoles={[super_admin, admin]}>
            <SchoolPage params={params} />
        </ProtectedRoute>
    )
}

function SchoolPage({ params }: SchoolPageProps) {
    const router = useRouter()
    const { id } = use(params)

    const { data: school, isLoading } = useQuery({
        queryKey: ['school', id],
        queryFn: () => SchoolEndpoints.getSchoolDetails(id)
    })
    const { data: admins, isLoading: adminsLoading } = useQuery({
        queryKey: ['admins', id],
        queryFn: () => SchoolEndpoints.getSchoolAdmins(id),
        enabled: !!id
    })
    if (isLoading || adminsLoading) {
        return <FullPageSpinner />
    }

    if (!school) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h2 className="text-xl font-semibold mb-2">School not found</h2>
                    <p className="text-muted-foreground mb-4">The school you're looking for doesn't exist.</p>
                    <Button onClick={() => router.back()}>Go Back</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="relative">
                <div className="aspect-[16/9] overflow-hidden">
                    {school.logo ? (
                        <Image
                            src={school.logo}
                            alt={school.name}
                            className="object-cover w-full h-full"
                            width={1000}
                            height={1000}
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                            <Building className="h-32 w-32 text-blue-400" />
                        </div>
                    )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

                <div className="absolute top-4 left-4 z-20">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background/80 backdrop-blur hover:bg-accent hover:text-accent-foreground h-10 w-10"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl px-4 -mt-32 relative z-10 space-y-12 pb-12">
                <div className="grid md:grid-cols-[300px_1fr] gap-8">
                    {/* School Logo */}
                    <div className="mx-auto md:mx-0">
                        <div className="aspect-square overflow-hidden rounded-lg shadow-2xl ring-1 ring-border bg-white">
                            {school.logo ? (
                                <Image
                                    src={school.logo}
                                    alt={school.name}
                                    className="object-cover w-full h-full"
                                    width={300}
                                    height={300}
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                                    <Building className="h-20 w-20 text-blue-400" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Main Info */}
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <h1 className="text-4xl font-bold tracking-tight">{school.name}</h1>
                            <div className="flex items-center text-lg text-muted-foreground">
                                <Mail className="h-5 w-5 mr-2" />
                                {school.full_email_domain}
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold bg-blue-100 text-blue-700">
                                <Building className="w-4 h-4 mr-1" />
                                Educational Institution
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                                <Users className="w-4 h-4 mr-1" />
                                {school.user_count} Users
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                                <Building className="w-4 h-4 mr-1" />
                                {school.department_count} Departments
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="relative flex flex-wrap gap-3 pt-2">
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit School
                            </Button>
                            <Button variant="outline">
                                <Users className="h-4 w-4 mr-2" />
                                View Users
                            </Button>
                            <Button variant="outline">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Department
                            </Button>
                            <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* School Details */}
                <div className="grid md:grid-cols-2 gap-8 pt-8 border-t">
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold">School Information</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-muted-foreground">School Name</span>
                                <span className="font-medium">{school.name}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-muted-foreground">Email Domain</span>
                                <span className="font-medium">{school.full_email_domain}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-muted-foreground">Location</span>
                                <span className="font-medium">{school.location || 'Not specified'}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-muted-foreground">Phone</span>
                                <span className="font-medium">{school.phone || 'Not specified'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold">Statistics</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-muted-foreground">Total Users</span>
                                <span className="font-medium">{school.user_count}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-muted-foreground">Departments</span>
                                <span className="font-medium">{school.department_count}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-muted-foreground">Status</span>
                                <span className="font-medium">
                                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${school.is_active
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                        }`}>
                                        {school.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Departments */}
                {school.departments && school.departments.length > 0 && (
                    <div className="space-y-6 pt-8 border-t">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Departments</h2>
                            <Button variant="outline" size="sm">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Department
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {school.departments.map((department) => (
                                <Card key={department.id} className="hover:shadow-md transition-all">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-lg">{department.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground mb-3">
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
                    </div>
                )}

                {/* School Admins */}
                <div className="space-y-6 pt-8 border-t">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">School Administrators</h2>
                        <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Admin
                        </Button>
                    </div>

                    {admins && admins.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {admins.map((admin) => (
                                <Card key={admin.id} className="hover:shadow-md transition-all">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                <span className="text-blue-600 font-semibold text-sm">
                                                    {admin.first_name?.charAt(0)}{admin.last_name?.charAt(0)}
                                                </span>
                                            </div>
                                            <div>
                                                <CardTitle className="text-base">{admin.first_name} {admin.last_name}</CardTitle>
                                                <p className="text-sm text-muted-foreground">{admin.email}</p>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between">
                                            <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-800">
                                                <Users className="h-3 w-3 mr-1" />
                                                Admin
                                            </span>
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="sm">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card className="bg-gray-50">
                            <CardContent className="p-8 text-center">
                                <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No administrators yet</h3>
                                <p className="text-gray-500 mb-4">This school doesn't have any administrators assigned</p>
                                <Button variant="outline">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add First Admin
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}