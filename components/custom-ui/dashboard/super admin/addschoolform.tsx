"use client"
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form"
import { Building, Mail, MapPin, Phone, Upload } from "lucide-react";

const AddSchoolSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email_domain: z.string().min(1, { message: "Email domain is required" }),
    location: z.string().min(1, { message: "Location is required" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    logo: z.instanceof(File).optional(),
})

type AddSchoolData = z.infer<typeof AddSchoolSchema>

export default function AddSchoolForm({ onSubmit }: { onSubmit: (data: AddSchoolData) => void }) {
    const form = useForm<AddSchoolData>({
        resolver: zodResolver(AddSchoolSchema),
        defaultValues: {
            name: "",
            email_domain: "",
            location: "",
            phone: "",
        },
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <Building className="h-4 w-4" />
                                    School Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Enter school name"
                                        className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email_domain"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    Email Domain
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="university.edu"
                                        className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    Location
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="City, State"
                                        className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    Phone Number
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="(555) 123-4567"
                                        className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="logo"
                    render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Upload className="h-4 w-4" />
                                School Logo
                            </FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            onChange(file);
                                        }}
                                        className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <p className="text-xs text-gray-500 mt-1">Upload a logo image (PNG, JPG, or GIF)</p>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="pt-4">
                    <Button
                        type="submit"
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-base transition-all duration-200 hover:scale-[1.02] shadow-lg"
                    >
                        <Building className="h-5 w-5 mr-2" />
                        Create School
                    </Button>
                </div>
            </form>
        </Form>
    )
}



