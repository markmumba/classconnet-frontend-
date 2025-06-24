"use client"
import { useQuery } from "@tanstack/react-query";
import { ProtectedRoute } from "../protected";
import { all } from "@/lib/utils";
import { UserEndpoints } from "@/lib/api/service";
import { useEffect, useState } from "react";
import { User } from "@/lib/api/types";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredClassmates, setFilteredClassmates] = useState<User[]>([]);

    const { data: classmates, isLoading, error } = useQuery({
        queryKey: ['getClassmates'],
        queryFn: () => UserEndpoints.getUserGraduateClass()
    });

    useEffect(() => {
        if (classmates) {
            const filtered = classmates.filter((classmate) =>
                classmate.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                classmate.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
                classmate.career_path.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredClassmates(filtered);
        }
    }, [classmates, searchTerm]);

    if (isLoading) {
        return (
            <ProtectedRoute allowedRoles={all}>
                <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading your graduating class...</p>
                        </div>
                    </div>
                </div>
            </ProtectedRoute>
        );
    }

    if (error) {
        return (
            <ProtectedRoute allowedRoles={all}>
                <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center py-12">
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                <p>Error loading classmates. Please try again later.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </ProtectedRoute>
        );
    }

    return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Header */}
               

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {filteredClassmates.length === 0 ? (
                        <div className="text-center py-12">
                            <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                {searchTerm ? "No classmates found" : "No classmates yet"}
                            </h3>
                            <p className="text-gray-600">
                                {searchTerm
                                    ? "Try adjusting your search terms"
                                    : "Your graduating class will appear here once they join"
                                }
                            </p>
                            {searchTerm && (
                                <Button
                                    variant="outline"
                                    onClick={() => setSearchTerm("")}
                                    className="mt-4"
                                >
                                    Clear search
                                </Button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
                            {filteredClassmates.map((classmate, index) => (
                                <div
                                    key={classmate.id}
                                    className="animate-fadeInUp"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <PolaroidCard classmate={classmate} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
    );
}

interface PolaroidCardProps {
    classmate: User;
}

function PolaroidCard({ classmate }: PolaroidCardProps) {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="group relative h-full">
            {/* Polaroid Card */}
            <div className="bg-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-200 h-full flex flex-col">
                {/* Photo Area with Polaroid Frame */}
                <div className="relative p-4 pb-2 flex-shrink-0">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-4 border-white shadow-inner">
                        {classmate.picture && !imageError ? (
                            <img
                                src={classmate.picture}
                                alt={classmate.full_name}
                                className="w-full h-full object-cover"
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                                <div className="text-center">
                                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                    <p className="text-xs text-gray-500">No photo</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Area - Only Name and Quote */}
                <div className="p-4 pt-2 flex-1 flex flex-col">
                    {/* Name */}
                    <h3 className="font-bold text-lg text-gray-900 mb-3 text-center">
                        {classmate.full_name}
                    </h3>

                    {/* Quote */}
                    <div className="flex-1 flex items-center justify-center">
                        {classmate.quote ? (
                            <p className="text-sm text-gray-600 italic text-center line-clamp-3 leading-relaxed">
                                "{classmate.quote}"
                            </p>
                        ) : (
                            <p className="text-sm text-gray-400 italic text-center">
                                No quote yet
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Enhanced Polaroid Shadow Effect */}
            <div className="absolute inset-0 bg-black opacity-10 rounded-lg transform translate-y-2 scale-95 -z-10 blur-sm"></div>
            <div className="absolute inset-0 bg-black opacity-5 rounded-lg transform translate-y-1 scale-98 -z-20"></div>
        </div>
    );
}