import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";



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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Name"
                                    className="text-lg py-3 px-4"
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
                            <FormLabel>Email Domain</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Email Domain"
                                    className="text-lg py-3 px-4"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Location"
                                    className="text-lg py-3 px-4"
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
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Phone"
                                    className="text-lg py-3 px-4"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="logo"
                    render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                            <FormLabel>Logo</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        onChange(file);
                                    }}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-sm sm:text-base py-2 sm:py-3">Add School</Button>
            </form>

        </Form>
    )
}



