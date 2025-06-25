
"use client"

interface FullPageSpinnerProps {
    message?: string;
}

export default function FullPageSpinner({ message = "Loading..." }: FullPageSpinnerProps) {
    return (
        <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="text-center">
                <div className="relative">
                    {/* Outer ring */}
                    <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin"></div>
                    {/* Inner ring */}
                    <div className="w-16 h-16 border-4 border-t-blue-500 rounded-full animate-spin absolute top-0 left-0"></div>
                </div>
                <p className="mt-4 text-gray-600 font-medium">{message}</p>
            </div>
        </div>
    );
}
