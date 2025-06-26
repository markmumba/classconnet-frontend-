"use client"
import { ProtectedRoute } from "@/app/protected";
import AddDepartmentForm from "@/components/custom-ui/dashboard/school admin/adddepartmentform";
import { SubSchoolEndpoints } from "@/lib/api/service";
import { SubSchool, SubSchoolAdd } from "@/lib/api/types";
import { admin } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import FullPageSpinner from "@/components/custom-ui/shared/fullpagespinner";

export default function ProtectedAddDepartmentPage() {
    return (
        <ProtectedRoute allowedRoles={[admin]} >
            <AddDepartment />
        </ProtectedRoute>
    )
}

function AddDepartment() {
    const queryClient = useQueryClient();
    const router = useRouter();

    const { mutate: addDepartment, isPending } = useMutation({
        mutationFn: (department: SubSchoolAdd) => SubSchoolEndpoints.addSubSchool(department),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["departments"] })
            queryClient.invalidateQueries({ queryKey: ["school"] })
            toast.success("Department added successfully")
            router.push("/dashboard")
        },
        onError: () => {
            toast.error("Failed to add department")
        }
    })

    const onSubmit = (data: SubSchoolAdd) => {
        addDepartment(data)
    }

    if (isPending) {
        return <FullPageSpinner />
    }

    return (
        <div className="min-h-screen py-8">
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
                        <h1 className="text-3xl font-bold text-gray-900">Add New Department</h1>
                    </div>
                    <p className="text-gray-600">Create a new academic department for your school</p>
                </div>

                {/* Form Card */}
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="pb-6">
                        <CardTitle className="text-xl font-semibold text-gray-900">Department Information</CardTitle>
                        <p className="text-sm text-gray-500">Fill in the details below to create a new department</p>
                    </CardHeader>
                    <CardContent>
                        <AddDepartmentForm onSubmit={onSubmit} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}