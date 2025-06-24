"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { GraduationCap, Users, ArrowRight, Eye, EyeOff } from "lucide-react"
import { AuthEndpoints } from "@/lib/api/service"
import useAuthStore from "@/lib/store"
import { LoginResponse } from "@/lib/api/types"
import { useRouter } from "next/navigation"

const LoginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
})

type LoginData = z.infer<typeof LoginSchema>

export default function ClassConnectLoginPage() {

    const router = useRouter();

    const { login } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<LoginData>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const { mutate: loginMutation, isPending } = useMutation({
        mutationFn: (loginData: LoginData) => AuthEndpoints.login(loginData),
        onSuccess: (data: LoginResponse) => {
            login(data.user, data.refresh, data.access)
            toast.success("Welcome back!", {
                description: "You've successfully logged in to ClassConnect.",
            })
            router.push("/dashboard")
        },
        onError: (error: any) => {
            toast.error("Login failed", {
                description: error.response?.data?.message || "Invalid email or password. Please try again.",
            })
        }
    })

    const onSubmit = (data: LoginData) => {
        loginMutation(data)
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row overflow-x-hidden bg-gray-50 px-0 py-safe">
            {/* Left side - Static blue section */}
            <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col justify-center items-center text-white px-4 sm:px-8 md:px-12 py-8 md:py-12 min-h-[180px] md:min-h-screen">
                <div className="text-center max-w-md w-full">
                    <GraduationCap className="w-12 h-12 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 opacity-90" />
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-4 leading-tight">
                        Welcome Back to ClassConnect
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl opacity-90 leading-relaxed mb-4 md:mb-6">
                        Reconnect with your classmates and explore new memories in your digital yearbook.
                    </p>
                    <div className="space-y-2 md:space-y-4 text-blue-200">
                        <div className="flex items-center justify-center space-x-2">
                            <Users className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="text-xs sm:text-sm">Join thousands of connected students</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                            <GraduationCap className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="text-xs sm:text-sm">Your memories are waiting</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right/Bottom Login Form Area */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gray-50 px-4 sm:px-8 md:px-12 py-8 md:py-12 gap-0 md:gap-8">
                <div className="w-full max-w-md mx-auto pb-8">

                    <div className="text-center mb-8">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
                        <p className="text-xs sm:text-sm text-gray-600">Enter your credentials to access your account</p>
                    </div>

                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="john.doe@university.edu"
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
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="Enter your password"
                                                        className="text-lg py-3 px-4 pr-12"
                                                        {...field}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="h-4 w-4 text-gray-400" />
                                                        ) : (
                                                            <Eye className="h-4 w-4 text-gray-400" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex items-center justify-between">
                                    {/* <FormField
                    control={form.control}
                    name="remember_me"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            Remember me
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  /> */}

                                    <Link
                                        href="/forgot-password"
                                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-sm sm:text-base py-2 sm:py-3"
                                >
                                    {isPending ? (
                                        <div className="flex items-center gap-2">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            Signing In...
                                        </div>
                                    ) : (
                                        <>
                                            Sign In <ArrowRight className="w-5 h-5 ml-2" />
                                        </>
                                    )}
                                </Button>

                            </form>
                        </Form>

                        {/* Divider */}
                        <div className="mt-6 relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">New to ClassConnect?</span>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <Link
                                href="/register"
                                className="text-blue-600 hover:text-blue-700 font-semibold"
                            >
                                Create your account and join your class
                            </Link>
                        </div>
                        <p className="text-center text-gray-500 mt-6">Go Home <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">Home</Link></p>
                    </div>

                    <div className="mt-6 text-center space-y-2">
                        <p className="text-sm text-gray-500">
                            Having trouble? {" "}
                            <Link href="/support" className="text-blue-600 hover:text-blue-700">
                                Contact Support
                            </Link>
                        </p>
                        <p className="text-xs text-gray-400">
                            By signing in, you agree to our{" "}
                            <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                                Terms of Service
                            </Link>
                            {" "}and{" "}
                            <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
                                Privacy Policy
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}