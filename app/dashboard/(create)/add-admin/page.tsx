"use client"
import { super_admin } from "@/lib/utils";
import { ProtectedRoute } from "@/app/protected";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserEndpoints } from "@/lib/api/service";
import { createAdmin } from "@/lib/api/types";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import AddAdminForm from "@/components/custom-ui/dashboard/super admin/addadminform";

export default function  ProtectedAddAdminPage() {
    return (
        <ProtectedRoute allowedRoles={[super_admin]}>
            <AddAdmin />
        </ProtectedRoute>
    )
}

function AddAdmin() {           

    const searchParams = useSearchParams()
    const schoolId = searchParams.get('schoolId')

    const queryClient = useQueryClient()
    const router = useRouter()
    const { mutate: createAdmin, isPending } = useMutation({
        mutationFn: (admin: createAdmin) => UserEndpoints.createAdmin(admin),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getSchoolAdmins'] })
            queryClient.invalidateQueries({ queryKey: ['getSchoolDetails'] })
            toast.success("Admin created successfully")
            if (schoolId) {
                router.push(`/dashboard/schools/${schoolId}`)
            } else {
                router.push(`/dashboard/schools`)
            }
        },
        onError: () => {
            toast.error("Failed to create admin")
        }
    })

    const onSubmit = (data: createAdmin) => {
        createAdmin(data)
    }

    return (
        <div className=" items-center justify-center h-screen mx-auto lg:w-1/2">
            <AddAdminForm onSubmit={onSubmit} />
        </div>
    )
}