import { ProtectedRoute } from "@/app/protected"
import AddSchoolForm from "@/components/custom-ui/dashboard/super admin/addschoolform"
import FullPageSpinner from "@/components/custom-ui/shared/fullpagespinner"
import { SchoolEndpoints } from "@/lib/api/service"
import { AddSchoolData } from "@/lib/api/types"
import {  super_admin } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function ProtectedAddSchoolPage() {
    return (
        <ProtectedRoute allowedRoles={[super_admin]}>
            <AddSchoolPage />
        </ProtectedRoute>
    )
}




function AddSchoolPage() {   

    const router = useRouter()

    const {mutate:addSchool ,isPending} = useMutation ({
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
        return <FullPageSpinner/>
    }

    return (
        <div>
            <h1>Add School</h1>
            <AddSchoolForm onSubmit={onSubmit} />
        </div>
    )
}