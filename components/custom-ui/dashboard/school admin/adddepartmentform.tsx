"use client"
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormControl } from "@/components/ui/form";
import { FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Building, FileText } from "lucide-react";

const AddDepartmentSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
})

type AddDepartmentData = z.infer<typeof AddDepartmentSchema>

export default function AddDepartmentForm({ onSubmit }: { onSubmit: (data: AddDepartmentData) => void }) {
    const form = useForm<AddDepartmentData>({
        resolver: zodResolver(AddDepartmentSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Building className="h-4 w-4" />
                                Department Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter department name (e.g., Computer Science)"
                                    className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                Description
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder="Describe the department's focus, programs, and objectives..."
                                    className="min-h-[120px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
                                />
                            </FormControl>
                            <p className="text-xs text-gray-500 mt-1">
                                Provide a clear description of what this department covers and its academic focus
                            </p>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="pt-4 flex gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => form.reset()}
                        className="flex-1 h-11 border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                        Reset Form
                    </Button>
                    <Button
                        type="submit"
                        className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 hover:scale-[1.02] shadow-lg"
                    >
                        <Building className="h-5 w-5 mr-2" />
                        Create Department
                    </Button>
                </div>
            </form>
        </Form>
    )
}