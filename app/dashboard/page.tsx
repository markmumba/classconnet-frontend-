"use client"
import { useQuery } from "@tanstack/react-query";
import { UserEndpoints } from "@/lib/api/service";
import { useEffect, useState } from "react";
import { User } from "@/lib/api/types";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

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
            <div className="max-w-2xl mx-auto p-4 bg-white min-h-screen">
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300 mx-auto"></div>
                    <p className="mt-4 text-gray-500 text-sm">Loading classmates...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-2xl mx-auto p-4 bg-white min-h-screen">
                <div className="text-center py-12">
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                        <p>Error loading classmates: {error.message}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <section className="py-8">
                <div className="mx-auto max-w-7xl px-4 space-y-2 text-center">
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Your Classmates</h1>
                    <p className="mx-auto max-w-md text-gray-500 text-base">
                        Browse your fellow classmates and their yearbook quotes.
                    </p>
                </div>
            </section>
            <div className="mx-auto max-w-7xl px-4 pb-12">
                {filteredClassmates.length === 0 ? (
                    <div className="text-center py-12">
                        <Camera className="h-10 w-10 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-base font-medium text-gray-900 mb-2">
                            {searchTerm ? "No classmates found" : "No classmates yet"}
                        </h3>
                        <p className="text-gray-400 text-sm">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 items-stretch">
                        {filteredClassmates.map((classmate, index) => (
                            <div
                                key={classmate.id}
                                className="flex justify-center animate-fadeInUp"
                                style={{ animationDelay: `${index * 0.07}s` }}
                            >
                                <Link href={`/dashboard/student/${classmate.id}`}>
                                    <PolaroidCard classmate={classmate} />
                                </Link>
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
        <div className="group relative overflow-hidden rounded-lg border bg-white text-gray-900 shadow-sm hover:shadow-md transition-all duration-300 w-full">
            <div className="relative aspect-[4/5] overflow-hidden w-full">
                {classmate.picture && !imageError ? (
                    <Image
                        src={classmate.picture}
                        alt={classmate.full_name}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        onError={() => setImageError(true)}
                        width={320}
                        height={400}
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-100">
                        <Camera className="h-10 w-10 text-gray-300" />
                    </div>
                )}
            </div>
            <div className="p-3 space-y-1">
                <h3 className="font-semibold leading-none tracking-tight line-clamp-1 text-center text-base">
                    {classmate.full_name}
                </h3>
                <p className="text-sm text-gray-500 italic line-clamp-3 text-center">
                    {classmate.quote ? `"${classmate.quote}"` : "No quote yet"}
                </p>
            </div>
        </div>
    );
}