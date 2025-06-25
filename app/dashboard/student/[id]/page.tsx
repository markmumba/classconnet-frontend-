// "use client"
// import { useQuery } from "@tanstack/react-query";
// import { UserEndpoints } from "@/lib/api/service";
// import { User } from "@/lib/api/types";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { 
//     ArrowLeft, 
//     GraduationCap, 
//     School, 
//     User as UserIcon, 
//     Quote, 
//     Calendar,
//     Building,
//     BookOpen,
//     Mail,
//     Badge,
//     MapPin,
//     Clock,
//     Users,
//     Star,
//     Share2,
//     Heart,
//     MessageCircle
// } from "lucide-react";
// import { formatDate } from "@/lib/utils";

// interface StudentPageProps {
//     params: { id: string };
// }

// export default function StudentPage({ params }: StudentPageProps) {
//     const router = useRouter();
//     const { id } = params;
    
//     const { data: user, isLoading, error } = useQuery<User>({
//         queryKey: ["getUserById", id],
//         queryFn: () => UserEndpoints.getUserById(id),
//     });

//     // You can add these queries for related data
//     const { data: relatedStudents } = useQuery({
//         queryKey: ["getRelatedStudents", user?.school_id, user?.major],
//         queryFn: () => UserEndpoints.getStudentsBySchoolAndMajor(user?.school_id, user?.major),
//         enabled: !!user?.school_id && !!user?.major,
//     });

//     if (isLoading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
//             </div>
//         );
//     }

//     if (error || !user) {
//         return (
//             <div className="min-h-screen flex items-center justify-center p-4">
//                 <div className="text-center space-y-4">
//                     <h2 className="text-2xl font-bold tracking-tight">Student not found</h2>
//                     <p className="text-muted-foreground">The student you're looking for doesn't exist or has been removed.</p>
//                     <button
//                         onClick={() => router.back()}
//                         className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
//                     >
//                         <ArrowLeft className="h-4 w-4 mr-2" />
//                         Go Back
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-background">
//             <div className="relative">
//                 {/* Background Image */}
//                 <div className="aspect-[16/9] overflow-hidden">
//                     {user.picture ? (
//                         <Image
//                             src={user.picture}
//                             alt={user.full_name}
//                             className="object-cover w-full h-full"
//                             width={1000}
//                             height={1000}
//                         />
//                     ) : (
//                         <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
//                             <UserIcon className="h-32 w-32 text-muted-foreground/50" />
//                         </div>
//                     )}
//                 </div>
//                 <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

//                 {/* Back Button */}
//                 <div className="absolute top-4 left-4 z-20">
//                     <button
//                         onClick={() => router.back()}
//                         className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background/80 backdrop-blur hover:bg-accent hover:text-accent-foreground h-10 w-10"
//                     >
//                         <ArrowLeft className="h-4 w-4" />
//                     </button>
//                 </div>
//             </div>

//             <div className="container mx-auto max-w-7xl px-4 -mt-32 relative z-10 space-y-12 pb-12">
//                 <div className="grid md:grid-cols-[300px_1fr] gap-8">
//                     {/* Profile Picture */}
//                     <div className="mx-auto md:mx-0">
//                         <div className="aspect-[2/3] overflow-hidden rounded-lg shadow-2xl ring-1 ring-border">
//                             {user.picture ? (
//                                 <Image
//                                     src={user.picture}
//                                     alt={user.full_name}
//                                     className="object-cover w-full h-full"
//                                     width={1000}
//                                     height={1000}
//                                 />
//                             ) : (
//                                 <div className="w-full h-full bg-muted flex items-center justify-center">
//                                     <UserIcon className="h-20 w-20 text-muted-foreground" />
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     {/* Main Info */}
//                     <div className="space-y-8">
//                         <div className="space-y-3">
//                             <h1 className="text-4xl font-bold tracking-tight">{user.full_name}</h1>
//                             {user.quote && (
//                                 <div className="flex items-start gap-2">
//                                     <Quote className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
//                                     <p className="text-lg text-muted-foreground italic">&quot;{user.quote}&quot;</p>
//                                 </div>
//                             )}
//                         </div>

//                         <div className="flex flex-wrap items-center gap-4">
//                             <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold bg-primary text-primary-foreground">
//                                 <GraduationCap className="w-4 h-4 mr-1" />
//                                 Class of {user.graduation_year}
//                             </div>
//                             <div className="flex items-center text-sm text-muted-foreground">
//                                 <School className="w-4 h-4 mr-1" />
//                                 {user.school_name}
//                             </div>
//                             <div className="flex items-center text-sm text-muted-foreground">
//                                 <Calendar className="w-4 h-4 mr-1" />
//                                 Joined {formatDate(user.date_joined)}
//                             </div>
//                         </div>

//                         {/* Tags */}
//                         <div className="flex flex-wrap gap-2">
//                             {user.major && (
//                                 <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
//                                     {user.major}
//                                 </span>
//                             )}
//                             {user.department && (
//                                 <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
//                                     {user.department}
//                                 </span>
//                             )}
//                             {user.role && (
//                                 <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
//                                     {user.role}
//                                 </span>
//                             )}
//                         </div>

//                         {/* Career Path */}
//                         {user.career_path && (
//                             <div className="space-y-3">
//                                 <h2 className="text-xl font-semibold">Career Path</h2>
//                                 <p className="text-muted-foreground leading-relaxed">{user.career_path}</p>
//                             </div>
//                         )}

//                         {/* Action Buttons */}
//                         <div className="relative flex flex-wrap gap-3 pt-2">
//                             <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
//                                 <MessageCircle className="h-4 w-4 mr-2" />
//                                 Connect
//                             </button>
//                             <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
//                                 <Mail className="h-4 w-4 mr-2" />
//                                 Email
//                             </button>
//                             <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
//                                 <Heart className="h-4 w-4" />
//                             </button>
//                             <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
//                                 <Share2 className="h-4 w-4" />
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Student Details */}
//                 <div className="grid md:grid-cols-2 gap-8 pt-8 border-t">
//                     <div className="space-y-6">
//                         <h2 className="text-xl font-semibold">Academic Information</h2>
//                         <div className="space-y-4">
//                             <div className="flex justify-between items-center py-2 border-b">
//                                 <span className="text-muted-foreground">Student ID</span>
//                                 <span className="font-medium">{user.student_id}</span>
//                             </div>
//                             <div className="flex justify-between items-center py-2 border-b">
//                                 <span className="text-muted-foreground">School</span>
//                                 <span className="font-medium">{user.school_name}</span>
//                             </div>
//                             {user.sub_school && (
//                                 <div className="flex justify-between items-center py-2 border-b">
//                                     <span className="text-muted-foreground">Sub School</span>
//                                     <span className="font-medium">{user.sub_school}</span>
//                                 </div>
//                             )}
//                             <div className="flex justify-between items-center py-2 border-b">
//                                 <span className="text-muted-foreground">Major</span>
//                                 <span className="font-medium">{user.major || 'Not specified'}</span>
//                             </div>
//                             <div className="flex justify-between items-center py-2 border-b">
//                                 <span className="text-muted-foreground">Department</span>
//                                 <span className="font-medium">{user.department || 'Not specified'}</span>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="space-y-6">
//                         <h2 className="text-xl font-semibold">Personal Information</h2>
//                         <div className="space-y-4">
//                             <div className="flex justify-between items-center py-2 border-b">
//                                 <span className="text-muted-foreground">Full Name</span>
//                                 <span className="font-medium">{user.full_name}</span>
//                             </div>
//                             <div className="flex justify-between items-center py-2 border-b">
//                                 <span className="text-muted-foreground">Email</span>
//                                 <span className="font-medium">{user.email}</span>
//                             </div>
//                             <div className="flex justify-between items-center py-2 border-b">
//                                 <span className="text-muted-foreground">Role</span>
//                                 <span className="font-medium">{user.role}</span>
//                             </div>
//                             <div className="flex justify-between items-center py-2 border-b">
//                                 <span className="text-muted-foreground">Graduation Year</span>
//                                 <span className="font-medium">{user.graduation_year}</span>
//                             </div>
//                             <div className="flex justify-between items-center py-2 border-b">
//                                 <span className="text-muted-foreground">Date Joined</span>
//                                 <span className="font-medium">{formatDate(user.date_joined)}</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Related Students */}
//                 {relatedStudents && relatedStudents.length > 0 && (
//                     <div className="space-y-6 pt-8 border-t">
//                         <h2 className="text-xl font-semibold">Students in Same Program</h2>
//                         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                             {relatedStudents.slice(0, 8).map((student: User) => (
//                                 <div 
//                                     key={student.id} 
//                                     className="group cursor-pointer space-y-3 p-4 rounded-lg border hover:shadow-md transition-all"
//                                     onClick={() => router.push(`/student/${student.id}`)}
//                                 >
//                                     <div className="aspect-square overflow-hidden rounded-lg bg-muted">
//                                         {student.picture ? (
//                                             <Image
//                                                 src={student.picture}
//                                                 alt={student.full_name}
//                                                 className="object-cover w-full h-full group-hover:scale-105 transition-transform"
//                                                 width={200}
//                                                 height={200}
//                                             />
//                                         ) : (
//                                             <div className="w-full h-full flex items-center justify-center">
//                                                 <UserIcon className="h-8 w-8 text-muted-foreground" />
//                                             </div>
//                                         )}
//                                     </div>
//                                     <div className="space-y-1">
//                                         <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
//                                             {student.full_name}
//                                         </h3>
//                                         <p className="text-xs text-muted-foreground">
//                                             {student.major} • {student.graduation_year}
//                                         </p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

export default function StudentPage() {
    return <div>StudentPage</div>;
}