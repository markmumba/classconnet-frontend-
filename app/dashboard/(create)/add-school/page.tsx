"use client"
import { ProtectedRoute } from "@/app/protected"
import AddSchoolForm from "@/components/custom-ui/dashboard/super admin/addschoolform"
import FullPageSpinner from "@/components/custom-ui/shared/fullpagespinner"
import { SchoolEndpoints } from "@/lib/api/service"
import { AddSchoolData } from "@/lib/api/types"
import { super_admin } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Building } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProtectedAddSchoolPage() {
    return (
        <ProtectedRoute allowedRoles={[super_admin]}>
            <AddSchoolPage />
        </ProtectedRoute>
    )
}

function AddSchoolPage() {
    const router = useRouter()

    const { mutate: addSchool, isPending } = useMutation({
        mutationFn: (data: AddSchoolData) => SchoolEndpoints.addSchool(data),
        onSuccess: () => {
            toast.success("School added successfully")
            router.push("/dashboard")
        },
        onError: (error) => {
            toast.error("Failed to add school")
            console.log(error)
        }
    })

    const onSubmit = (data: AddSchoolData) => {
        addSchool(data)
    }

    if (isPending) {
        return <FullPageSpinner />
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-8">
            <div className="max-w-2xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Dashboard
                    </Button>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Building className="h-6 w-6 text-blue-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">Add New School</h1>
                    </div>
                    <p className="text-gray-600">Create a new educational institution in the system</p>
                </div>

                {/* Form Card */}
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="pb-6">
                        <CardTitle className="text-xl font-semibold text-gray-900">School Information</CardTitle>
                        <p className="text-sm text-gray-500">Fill in the details below to register a new school</p>
                    </CardHeader>
                    <CardContent>
                        <AddSchoolForm onSubmit={onSubmit} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}