"use client"
import { ProtectedRoute } from "@/app/protected";
import { admin, super_admin } from "@/lib/utils";
import { SubSchoolEndpoints } from "@/lib/api/service";
import { useQuery } from "@tanstack/react-query";
import FullPageSpinner from "@/components/custom-ui/shared/fullpagespinner";    
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionTrigger, AccordionItem } from "@/components/ui/accordion";
import { useRouter } from "next/navigation";
export default function ProtectedDepartmentsPage() {
    return (
        <ProtectedRoute allowedRoles={[admin, super_admin]}>
            <Departments />
        </ProtectedRoute>
    )
}

function Departments() {    
    const router = useRouter()
    const { data: departments, isPending } = useQuery({
        queryKey: ["departments"],
        queryFn: SubSchoolEndpoints.getSubSchools
    })

    if (isPending) return <FullPageSpinner />

    return (
        <div className="min-h-screen py-8 max-w-4xl mx-auto px-4">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
            </div>
            
            <div className="space-y-4 relative">
                {departments?.map((department) => (
                    <Accordion 
                        key={department.id} 
                        type="single" 
                        collapsible 
                        className="border border-gray-200 rounded-lg shadow-sm"
                    >
                        <AccordionItem value={department.id.toString()}>
                            <AccordionTrigger className="flex items-center justify-between w-full px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <Building className="h-5 w-5 text-blue-600" />
                                    <span className="font-medium text-lg">{department.name}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="p-6 space-y-4 bg-gray-50">
                                    <p className="text-gray-700 leading-relaxed">{department.description}</p>
                                    <Button 
                                        onClick={() => router.push(`/dashboard/departments/${department.id}`)}
                                        variant="outline"
                                        className="w-full hover:bg-blue-50 border-blue-200 text-blue-700"
                                    >
                                        View Department Details
                                    </Button>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))}
            </div>

           
        </div>
    )
}