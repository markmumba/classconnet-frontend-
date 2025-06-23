'use client'
import { useState } from 'react';
import { Input } from '../../ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Badge } from '../../ui/badge';

const initialClique = [
    { name: 'Alex Kim', img: '/student1.jpg' },
    { name: 'Maria Lopez', img: '/student2.jpg' },
    { name: 'Sam Patel', img: '/student3.jpg' },
    { name: 'Jenna Smith', img: '/student4.jpg' },
];

const leaderboard = [
    { name: 'Chris Wang', invites: 12 },
    { name: 'Priya Singh', invites: 10 },
    { name: 'Taylor Brooks', invites: 8 },
];

export default function Invite() {
    const [email, setEmail] = useState('');
    const [clique, setClique] = useState(initialClique);
    const [sent, setSent] = useState(false);

    function handleInvite(e: React.FormEvent) {
        e.preventDefault();
        if (!email) return;
        setSent(true);
        setTimeout(() => setSent(false), 2000);
        setEmail('');
        // Optionally add to clique preview
    }

    return (
        <section className="w-full max-w-2xl mx-auto py-16 px-2 sm:px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-8 text-center flex items-center justify-center gap-2">
                <span role="img" aria-label="friends">🤝</span> Invite Friends & Build Your Clique
            </h2>
            <form onSubmit={handleInvite} className="flex flex-col sm:flex-row gap-3 items-center justify-center mb-8 w-full">
                <Input
                    type="email"
                    placeholder="Enter school email..."
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full sm:w-auto max-w-lg rounded-full px-6 py-4 text-lg"
                    required
                />
                <Button type="submit" size="lg" className="rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-all px-6">
                    Invite
                </Button>
                {sent && <span className="text-green-600 text-sm ml-2">Invite sent!</span>}
            </form>
            <div className="mb-10">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span role="img" aria-label="clique">👥</span> Your Clique
                </h3>
                <div className="flex flex-wrap gap-3 items-center">
                    {clique.map((friend, idx) => (
                        <Avatar key={idx} className="w-12 h-12 border-2 border-blue-200 shadow">
                            <AvatarImage src={friend.img} alt={friend.name} />
                            <AvatarFallback>{friend.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                    ))}
                    {clique.length === 0 && <span className="text-gray-400">No friends invited yet.</span>}
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span role="img" aria-label="leaderboard">🏆</span> Top Inviters
                </h3>
                <div className="flex flex-col gap-2">
                    {leaderboard.map((user, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                            <Badge className="bg-pink-100 text-pink-700 border-pink-200 px-2 py-1 text-sm rounded-full">
                                #{idx + 1}
                            </Badge>
                            <span className="font-semibold text-gray-800">{user.name}</span>
                            <span className="text-xs text-gray-500 ml-auto">{user.invites} invites</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 