'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu, X, LogOut, User, Settings } from 'lucide-react';
import useAuthStore from '@/lib/store';
import { useRouter } from 'next/navigation';

const navItems = [
    { label: 'Explore', href: '#explore' },
    { label: 'Career', href: '#career' },
    { label: 'Friends', href: '#friends' },
    { label: 'Me', href: '#me' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
            // Still redirect even if logout fails
            router.push('/login');
        }
    };

    // Get user initials for avatar fallback
    const getUserInitials = () => {
        if (!user) return 'U';
        const firstInitial = user.first_name?.charAt(0) || '';
        const lastInitial = user.last_name?.charAt(0) || '';
        return (firstInitial + lastInitial).toUpperCase() || 'U';
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <span className="text-xl font-bold text-blue-700">ClassConnect</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    {/* Avatar Dropdown */}
                    <div className="hidden md:flex items-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage 
                                            src={user?.picture || "/avatar.jpg"} 
                                            alt={user?.first_name || "User"} 
                                        />
                                        <AvatarFallback>{getUserInitials()}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <div className="flex items-center justify-start gap-2 p-2">
                                    <div className="flex flex-col space-y-1 leading-none">
                                        {user?.first_name && (
                                            <p className="font-medium">{user.first_name}</p>
                                        )}
                                        {user?.email && (
                                            <p className="w-[200px] truncate text-sm text-muted-foreground">
                                                {user.email}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="border-t" />
                                <DropdownMenuItem 
                                    onClick={() => router.push('/profile')}
                                    className="cursor-pointer"
                                >
                                    <User className="mr-2 h-4 w-4" />
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                    onClick={() => router.push('/settings')}
                                    className="cursor-pointer"
                                >
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                </DropdownMenuItem>
                                <div className="border-t" />
                                <DropdownMenuItem 
                                    onClick={handleLogout}
                                    className="cursor-pointer text-red-600 focus:text-red-600"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}
                            <div className="pt-4 pb-3 border-t border-gray-200">
                                <div className="flex items-center px-3 mb-3">
                                    <Avatar className="h-8 w-8 mr-3">
                                        <AvatarImage 
                                            src={user?.picture || "/avatar.jpg"} 
                                            alt={user?.first_name || "User"} 
                                        />
                                        <AvatarFallback>{getUserInitials()}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="text-gray-700 text-sm font-medium">
                                            {user?.first_name || 'User'}
                                        </div>
                                        <div className="text-gray-500 text-xs">
                                            {user?.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <button
                                        onClick={() => {
                                            router.push('/profile');
                                            setIsOpen(false);
                                        }}
                                        className="w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 text-sm"
                                    >
                                        Profile
                                    </button>
                                    <button
                                        onClick={() => {
                                            router.push('/settings');
                                            setIsOpen(false);
                                        }}
                                        className="w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 text-sm"
                                    >
                                        Settings
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsOpen(false);
                                        }}
                                        className="w-full text-left px-3 py-2 text-red-600 hover:text-red-700 text-sm"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}