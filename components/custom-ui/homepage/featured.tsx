import React from 'react';
import Image from 'next/image';

const students = [
    {
        name: 'Alex Kim',
        quote: 'The best memories are made together.',
        img: '/student1.jpg',
        likes: 42,
    },
    {
        name: 'Maria Lopez',
        quote: 'Dream big, work hard, stay humble.',
        img: '/student2.jpg',
        likes: 37,
    },
    {
        name: 'Sam Patel',
        quote: 'Every day is a new adventure.',
        img: '/student3.jpg',
        likes: 29,
    },
    {
        name: 'Jenna Smith',
        quote: 'Be yourself; everyone else is already taken.',
        img: '/student4.jpg',
        likes: 25,
    },
    {
        name: 'Chris Wang',
        quote: 'Success is not the key to happiness. Happiness is the key to success.',
        img: '/student5.jpg',
        likes: 21,
    },
];

export default function Featured() {
    return (
        <section className="w-full max-w-6xl mx-auto py-16 px-2 sm:px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 flex items-center gap-2">
                    <span role="img" aria-label="star">🌟</span> Featured Students
                </h2>
                <button className="px-4 py-2 rounded-lg bg-pink-100 text-pink-700 font-semibold shadow hover:bg-pink-200 transition-all border border-pink-200 text-sm">
                    🔀 Shuffle
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                {students.map((student, idx) => (
                    <PolaroidCard key={idx} {...student} />
                ))}
            </div>
        </section>
    );
}

function PolaroidCard({ name, quote, img, likes }: { name: string; quote: string; img: string; likes: number }) {
    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 rotate-[-2deg] card w-full max-w-xs mx-auto">
            <div className="relative w-full h-40 sm:h-48">
                <Image
                    src={img}
                    alt={name}
                    className="object-cover object-top w-full h-full"
                    width={600}
                    height={600}
                    priority={true}
                />
            </div>
            <div className="p-4 w-full flex flex-col items-center">
                <span className="font-bold text-base sm:text-lg text-gray-900 mb-1">{name}</span>
                <span className="italic text-blue-700 text-sm sm:text-base text-center mb-2">“{quote}”</span>
                <span className="flex items-center gap-1 text-xs text-pink-600 font-semibold">
                    <span role="img" aria-label="heart">❤️</span> {likes}
                </span>
            </div>
        </div>
    );
}

// .card { background: white; border-radius: 1rem; box-shadow: 0 8px 16px rgba(0,0,0,0.1); overflow: hidden; } 