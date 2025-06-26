"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { createAdmin } from "@/lib/api/types"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, User, Building, GraduationCap } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SchoolEndpoints } from "@/lib/api/service"
import { useQuery } from "@tanstack/react-query"
import { useCallback, useState } from "react"

const addAdminSchema = z.object({
    email: z.string().email(),
    first_name: z.string(),
    last_name: z.string(),
    school_id: z.string(),
    role: z.string(),
})

type AddAdminFormData = z.infer<typeof addAdminSchema>

export default function AddAdminForm({ onSubmit }: { onSubmit: (data: createAdmin) => void }) {
    const form = useForm<AddAdminFormData>({
        resolver: zodResolver(addAdminSchema),
        defaultValues: {
            email: "",
            first_name: "",
            last_name: "",
            school_id: "",
            role: "admin",
        },
    })

    const [searchTerm, setSearchTerm] = useState("")

    const { data: schools } = useQuery({
        queryKey: ["schools", searchTerm],
        queryFn: () => SchoolEndpoints.getSchools(searchTerm),
        enabled: searchTerm.length > 2
    })


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  bg-white p-8   ">
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-center tracking-tight">Add New Administrator</h2>
                    <p className="text-muted-foreground text-center">Fill in the details below to create a new administrator account.</p>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="first_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium flex items-center gap-2">
                                        <User className="h-4 w-4 text-blue-500" />
                                        First Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter first name"
                                            className="h-10"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="last_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium flex items-center gap-2">
                                        <User className="h-4 w-4 text-blue-500" />
                                        Last Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter last name"
                                            className="h-10"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-blue-500" />
                                    Email Address
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="email"
                                        placeholder="admin@example.com"
                                        className="h-10"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="school_id"
                        render={({ field }) => (
                            <FormItem className="relative">
                                <FormLabel className="text-sm font-medium flex items-center gap-2">
                                    <Building className="h-4 w-4 text-blue-500" />
                                    Search School
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Start typing school name..."
                                        className="h-10"
                                        onChange={(e) => {
                                            debouncedSearch(e.target.value)
                                        }}
                                    />
                                </FormControl>
                                {schools && schools.length > 0 && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                                        {schools.map((school) => (
                                            <div
                                                key={school.id}
                                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                                onClick={() => {
                                                    field.onChange(school.id.toString())
                                                }}
                                            >
                                                {school.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="pt-6">
                    <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11"
                    >
                        Create Administrator Account
                    </Button>
                </div>
            </form>
        </Form>
    )
}
