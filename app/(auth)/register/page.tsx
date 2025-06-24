"use client"
import { useEffect, useRef, useState } from "react";
import * as z from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AuthEndpoints, SchoolEndpoints } from "@/lib/api/service";
import { DepartmentList, RegisterResponse, RegistrationData, SchoolList } from "@/lib/api/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useAuthStore from "@/lib/store";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowRight, Camera, GraduationCap,  School, Upload, Users } from "lucide-react";
import Link from "next/link";

const step1Schema = z.object({
    school: z.string().min(1, "Please select your school"),
})

const step2Schema = z.object({
    sub_school: z.string().min(1, "Please select your department"),
})

const step3Schema = z.object({
    email: z.string().email("Please enter a valid email address"),
    first_name: z.string().min(2, "Please enter your first name"),
    last_name: z.string().min(2, "Please enter your last name"),
    student_id: z.string().min(2, "Please enter your student ID"),
    graduation_year: z.string().min(2, "Please enter your graduation year"),
    major: z.string().min(2, "Please enter your major"),
    career_path: z.string().min(2, "Please enter your career path"),
})

const step4Schema = z.object({
    quote: z.string().min(2, "Please enter a quote"),
})
const step5Schema = z.object({
    picture: z.instanceof(File),
})


const step6Schema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirm_password: z.string().min(8, "Password must be at least 8 characters long"),
})


type step1Data = z.infer<typeof step1Schema>
type step2Data = z.infer<typeof step2Schema>
type step3Data = z.infer<typeof step3Schema>
type step4Data = z.infer<typeof step4Schema>
type step5Data = z.infer<typeof step5Schema>
type step6Data = z.infer<typeof step6Schema>


export default function ClassConnectRegisterFlow() {

    const router = useRouter();

    const { login } = useAuthStore();

    const [currentStep, setCurrentStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState<RegistrationData>({
        school: "",
        sub_school: "",
        email: "",
        first_name: "",
        last_name: "",
        student_id: "",
        graduation_year: "",
        major: "",
        password: "",
        career_path: "",
        quote: "",
        picture: null,
    })
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [schools, setSchools] = useState<SchoolList[]>([])
    const [departments, setDepartments] = useState<DepartmentList[]>([])
    const [selectedSchool, setSelectedSchool] = useState<SchoolList | null>(null)

    const schoolDomain = selectedSchool?.full_email_domain


    const { data: schoolsData } = useQuery({
        queryKey: ["schools"],
        queryFn: () => SchoolEndpoints.getSchools()
    })

    const { data: departmentsData } = useQuery({
        queryKey: ["departments", formData.school],
        queryFn: () => SchoolEndpoints.getDepartments(formData.school),
        enabled: !!formData.school
    })

    useEffect(() => {
        if (schoolsData) {
            setSchools(schoolsData)
            const school = schoolsData.find(school => school.id === Number(formData.school))
            if (school) {
                setSelectedSchool(school)
            }
        }
    }, [schoolsData])

    useEffect(() => {
        if (departmentsData) {
            setDepartments(departmentsData)

        }
    }, [departmentsData])

    useEffect(() => {
        if (schools.length && formData.school) {
            const school = schools.find(school => school.id === Number(formData.school));
            setSelectedSchool(school || null);
        }
    }, [schools, formData.school]);

    const step1Form = useForm<step1Data>({
        resolver: zodResolver(step1Schema),
        defaultValues: { school: formData.school || "" }
    })
    const step2Form = useForm<step2Data>({
        resolver: zodResolver(step2Schema),
        defaultValues: { sub_school: formData.sub_school || "" }
    })

    const step3Form = useForm<step3Data>({
        resolver: zodResolver(step3Schema),
        defaultValues: {
            email: formData.email || "",
            first_name: formData.first_name || "",
            last_name: formData.last_name || "",
            student_id: formData.student_id || "",
            graduation_year: formData.graduation_year || "",
        }
    })

    const step4Form = useForm<step4Data>({
        resolver: zodResolver(step4Schema),
        defaultValues: {
            quote: formData.quote || "",
        }
    })

    const step5Form = useForm<step5Data>({
        resolver: zodResolver(step5Schema),
        defaultValues: {
            picture: formData.picture || undefined,
        }
    })

    const step6Form = useForm<step6Data>({
        resolver: zodResolver(step6Schema),
        defaultValues: {
            password: formData.password || "",
        }
    })


    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 15 }, (_, i) => (currentYear - i).toString())

    const handleStep1Submit = (data: step1Data) => {
        setFormData(prev => ({ ...prev, ...data }))
        setCurrentStep(2)
    }

    const handleStep2Submit = (data: step2Data) => {
        setFormData(prev => ({ ...prev, ...data }))
        setCurrentStep(3)
    }

    const handleStep3Submit = (data: step3Data) => {
        if (schoolDomain && !data.email.endsWith(`${schoolDomain}`)) {
            step3Form.setError("email", {
                type: "manual",
                message: `Email must end with ${schoolDomain}`
            })
            return
        }
        setFormData(prev => ({ ...prev, ...data }))
        setCurrentStep(4)
    }

    const handleStep4Submit = (data: step4Data) => {
        setFormData(prev => ({ ...prev, ...data }))
        setCurrentStep(5)
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e: ProgressEvent<FileReader>) => {
                setPreviewImage(e.target?.result as string)
            }
            reader.readAsDataURL(file)
            step5Form.setValue("picture", e.target.files?.[0] as File)
        }
    }

    const handleStep5Submit = (data: step5Data) => {
        setFormData(prev => ({ ...prev, ...data }))
        setCurrentStep(6)
    }

    const { mutate: registerMutation, isPending } = useMutation({
        mutationFn: AuthEndpoints.register,
        onSuccess: (response: RegisterResponse) => {
            login(response.user, response.refresh, response.access)
            toast.success("Registration successful .Welcome to ClassConnect")
            router.push("/dashboard")
        },
        onError: (error) => {
            toast.error("Registration failed. Please try again.")
            console.error("Error submitting form:", error)
        }
    })

    const handleFinalSubmit = async (data: step6Data) => {
        if (data.password !== data.confirm_password) {
            step6Form.setError("confirm_password", {
                message: "Passwords do not match"
            })
            return
        }
        setIsSubmitting(true)
        console.log(formData)
        try {
            const submitData = new FormData()
            Object.keys(formData).forEach(key => {
                submitData.append(key, formData[key as keyof RegistrationData] as string)
            })
            submitData.append("password", data.password)
            registerMutation(submitData)
        } catch (error) {
            console.error("Error submitting form:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row overflow-x-hidden bg-gray-50 px-0 sm:px-0 md:px-0 py-safe">
            {/* Left/Top Banner */}
            <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-500 to-blue-800 flex flex-col justify-center items-center text-white px-4 sm:px-8 md:px-12 py-8 md:py-12 min-h-[220px] md:min-h-screen">
                <div className="text-center max-w-md w-full">
                    <GraduationCap className="w-14 h-14 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 opacity-90" />
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-4 leading-tight">
                        Ready to See Your Graduating Class?
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl opacity-90 leading-relaxed">
                        Connect with classmates, share memories, and celebrate your journey together in our digital yearbook.
                    </p>
                    <div className="mt-4 md:mt-8 flex items-center justify-center space-x-2 text-blue-200">
                        <Users className="w-4 h-4 md:w-5 md:h-5" />
                        <span className="text-xs sm:text-sm">Join thousands of students already connected</span>
                    </div>
                </div>
            </div>

            {/* Right/Bottom Form Area (no card) */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gray-50 px-2 sm:px-4 md:px-12 py-8 md:py-12 gap-0 md:gap-8">
                <div className="w-full max-w-md mx-auto px-4 sm:px-6 md:px-0">
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <div className="text-center mb-8">
                                <School className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">Which school were you in?</h2>
                                <p className="text-xs sm:text-sm text-gray-600">Select your institution from our list</p>
                            </div>

                            <Form {...step1Form}>
                                <form onSubmit={step1Form.handleSubmit(handleStep1Submit)} className="space-y-6">
                                    <FormField
                                        control={step1Form.control}
                                        name="school"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger className="w-full text-sm sm:text-lg h-10 sm:h-14 py-2 sm:py-3 px-3 sm:px-4 rounded-xl border-2 border-blue-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all">
                                                            <SelectValue placeholder="Select your school" />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-white shadow-xl rounded-xl border border-blue-200 z-50">
                                                            {schools?.map((school) => (
                                                                <SelectItem key={school.id} value={school.id.toString()} >
                                                                    {school.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type="submit"
                                        disabled={!schools || schools.length === 0}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-sm sm:text-base py-2 sm:py-3"
                                    >
                                        Next <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </form>
                            </Form>

                            {!schools && (
                                <div className="text-center text-gray-500">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                                    <p className="mt-2">Loading schools...</p>
                                </div>
                            )}
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <div className="text-center mb-8">
                                <School className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">Which department?</h2>
                                <p className="text-xs sm:text-sm text-gray-600">Select your specific college or department</p>
                            </div>

                            <Form {...step2Form}>
                                <form onSubmit={step2Form.handleSubmit(handleStep2Submit)} className="space-y-6">
                                    <FormField
                                        control={step2Form.control}
                                        name="sub_school"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger className="w-full text-sm sm:text-lg h-10 sm:h-14 py-2 sm:py-3 px-3 sm:px-4 rounded-xl border-2 border-blue-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all">
                                                            <SelectValue placeholder="Select your department" />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-white shadow-xl rounded-xl border border-blue-200 z-50">
                                                            {departments?.map((department) => (
                                                                <SelectItem key={department.id} value={department.id.toString()}>
                                                                    {department.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type="submit"
                                        disabled={!departments || departments.length === 0}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-sm sm:text-base py-2 sm:py-3"
                                    >
                                        Next <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </form>
                            </Form>

                            {!departments && formData.school && (
                                <div className="text-center text-gray-500">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                                    <p className="mt-2">Loading departments...</p>
                                </div>
                            )}

                            {departments && departments.length === 0 && (
                                <div className="text-center text-gray-500">
                                    <p>No departments found for this school.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <div className="text-center mb-8">
                                <Users className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">Tell us about yourself</h2>
                                <p className="text-xs sm:text-sm text-gray-600">Use your school email domain for verification</p>
                            </div>

                            <Form {...step3Form}>
                                <form onSubmit={step3Form.handleSubmit(handleStep3Submit)} className="space-y-4">
                                    <FormField
                                        control={step3Form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>School Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder={schoolDomain ? `john.doe${schoolDomain}` : "john.doe@university.edu"}
                                                        {...field}
                                                        className="w-full text-sm sm:text-lg h-10 sm:h-14 py-2 sm:py-3 px-3 sm:px-4 rounded-xl border-2 border-blue-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    {schoolDomain ? `Must end with ${schoolDomain}` : "Must match your school's domain"}
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={step3Form.control}
                                            name="first_name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>First Name</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="w-full text-sm sm:text-lg h-10 sm:h-14 py-2 sm:py-3 px-3 sm:px-4 rounded-xl border-2 border-blue-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                                                            placeholder="John"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={step3Form.control}
                                            name="last_name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Last Name</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="w-full text-sm sm:text-lg h-10 sm:h-14 py-2 sm:py-3 px-3 sm:px-4 rounded-xl border-2 border-blue-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                                                            placeholder="Doe"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={step3Form.control}
                                            name="student_id"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Student ID</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="w-full text-sm sm:text-lg h-10 sm:h-14 py-2 sm:py-3 px-3 sm:px-4 rounded-xl border-2 border-blue-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                                                            placeholder="12345678"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={step3Form.control}
                                            name="graduation_year"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Graduation Year</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-full text-sm sm:text-lg h-10 sm:h-14 py-2 sm:py-3 px-3 sm:px-4 rounded-xl border-2 border-blue-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all">
                                                                <SelectValue placeholder="Year" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className="bg-white shadow-xl rounded-xl border border-blue-200 z-50">
                                                            {years.map(year => (
                                                                <SelectItem
                                                                    key={year}
                                                                    value={year}
                                                                    className="hover:bg-blue-100 hover:text-blue-700 cursor-pointer"
                                                                >
                                                                    {year}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={step3Form.control}
                                        name="major"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Major</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="w-full text-sm sm:text-lg h-10 sm:h-14 py-2 sm:py-3 px-3 sm:px-4 rounded-xl border-2 border-blue-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                                                        placeholder="Computer Science"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={step3Form.control}
                                        name="career_path"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Career Path</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="w-full text-sm sm:text-lg h-10 sm:h-14 py-2 sm:py-3 px-3 sm:px-4 rounded-xl border-2 border-blue-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                                                        placeholder="Software Engineer"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-sm sm:text-base py-2 sm:py-3"
                                    >
                                        Next <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    )}

                    {currentStep === 4 && (
                        <div className="space-y-6">
                            <div className="text-center mb-8">
                                <GraduationCap className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">What will be your graduating quote?</h2>
                                <p className="text-xs sm:text-sm text-gray-600">Share something meaningful that represents your journey</p>
                            </div>

                            <Form {...step4Form}>
                                <form onSubmit={step4Form.handleSubmit(handleStep4Submit)} className="space-y-6">
                                    <FormField
                                        control={step4Form.control}
                                        name="quote"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Textarea
                                                        className="w-full min-h-[120px] text-sm sm:text-lg p-4 rounded-xl border-2 border-blue-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                                                        placeholder="Enter your inspiring quote that will appear in your yearbook profile..."
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    {field.value?.length || 0}/255 characters
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-sm sm:text-base py-2 sm:py-3"
                                    >
                                        Next <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    )}

                    {currentStep === 5 && (
                        <div className="space-y-6">
                            <div className="text-center mb-8">
                                <Camera className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">Add a photo your friends will identify you with</h2>
                                <p className="text-xs sm:text-sm text-gray-600">This will be your profile picture in the yearbook</p>
                            </div>

                            <Form {...step5Form}>
                                <form onSubmit={step5Form.handleSubmit(handleStep5Submit)} className="space-y-6">
                                    <FormField
                                        control={step5Form.control}
                                        name="picture"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="space-y-4">
                                                        {previewImage ? (
                                                            <div className="relative">
                                                                <img
                                                                    src={previewImage}
                                                                    alt="Profile preview"
                                                                    className="w-48 h-48 mx-auto rounded-full object-cover border-4 border-blue-200"
                                                                />
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="absolute bottom-2 right-1/2 transform translate-x-1/2"
                                                                    onClick={() => fileInputRef.current?.click()}
                                                                >
                                                                    Change Photo
                                                                </Button>
                                                            </div>
                                                        ) : (
                                                            <div
                                                                className="w-48 h-48 mx-auto border-2 border-dashed border-blue-300 rounded-full flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
                                                                onClick={() => fileInputRef.current?.click()}
                                                            >
                                                                <div className="text-center">
                                                                    <Upload className="w-12 h-12 mx-auto text-blue-400 mb-2" />
                                                                    <p className="text-blue-600 font-medium">Click to upload</p>
                                                                    <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                                                                </div>
                                                            </div>
                                                        )}

                                                        <input
                                                            ref={fileInputRef}
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageChange}
                                                            className="hidden"
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-sm sm:text-base py-2 sm:py-3"
                                    >
                                        Next <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    )}
                    {currentStep === 6 && (
                        <Form {...step6Form}>
                            <form onSubmit={step6Form.handleSubmit(handleFinalSubmit)} className="space-y-6">
                                <FormField
                                    control={step6Form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password"
                                                    className="w-full text-sm sm:text-lg h-10 sm:h-14 py-2 sm:py-3 px-3 sm:px-4 rounded-xl border-2 border-blue-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={step6Form.control}
                                    name="confirm_password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input type="password"
                                                    className="w-full text-sm sm:text-lg h-10 sm:h-14 py-2 sm:py-3 px-3 sm:px-4 rounded-xl border-2 border-blue-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-sm sm:text-base py-2 sm:py-3"
                                >
                                    {isSubmitting ? "Creating Profile..." : "Create My Profile"}
                                    <GraduationCap className="w-5 h-5 ml-2" />
                                </Button>
                            </form>
                        </Form>
                    )}

                
                </div>
            <p className="text-center text-gray-500 mt-6">Already have an account? <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">Login</Link></p>
            </div>
        </div>
    )

}
