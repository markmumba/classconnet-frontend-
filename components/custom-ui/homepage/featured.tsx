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

// Tailwind rotation classes
const rotations = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-3', '-rotate-3', 'rotate-2'];

export default function Featured() {
    return (
        <section className="w-full max-w-6xl mx-auto py-16 px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 flex items-center gap-2">
                    <span role="img" aria-label="star">🌟</span> Featured Students
                </h2>
                <button className="px-4 py-2 rounded-lg bg-pink-100 text-pink-700 font-semibold shadow hover:bg-pink-200 transition-all border border-pink-200 text-sm">
                    🔀 Shuffle
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 place-items-center">
                {students.map((student, idx) => (
                    <PolaroidCard 
                        key={idx} 
                        {...student} 
                        rotation={rotations[idx % rotations.length]}
                        index={idx}
                    />
                ))}
            </div>
        </section>
    );
}

function PolaroidCard({ 
    name, 
    quote, 
    img, 
    likes, 
    rotation, 
    index 
}: { 
    name: string; 
    quote: string; 
    img: string; 
    likes: number;
    rotation: string;
    index: number;
}) {
    return (
        <div 
            className={`
                bg-white rounded-lg shadow-lg border-8 border-white 
                overflow-hidden flex flex-col 
                hover:scale-110 hover:shadow-2xl hover:rotate-0
                transition-all duration-500 ease-out
                w-64 h-80 
                ${rotation}
                opacity-0 translate-y-8
                animate-[fadeInUp_0.8s_ease-out_forwards]
            `}
            style={{ 
                animationDelay: `${index * 100}ms`,
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))'
            }}
        >
            {/* Photo area */}
            <div className="relative w-full h-48 bg-gray-100">
                <Image
                    src={img}
                    alt={name}
                    className="object-cover object-top w-full h-full"
                    width={600}
                    height={600}
                    priority={true}
           
                />
                {/* Fallback gradient */}
                <div className="w-full h-full bg-gradient-to-br from-blue-200 to-blue-300 hidden items-center justify-center absolute top-0 left-0">
                    <span className="text-white text-4xl">👤</span>
                </div>
            </div>
            
            {/* White space at bottom like a real polaroid */}
            <div className="p-4 bg-white flex-1 flex flex-col justify-center text-center">
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {name}
                </h3>
                <p className="text-sm text-blue-700 italic leading-relaxed mb-3">
                    "{quote}"
                </p>
                <div className="flex items-center justify-center gap-1 text-sm text-pink-600 font-semibold">
                    <span role="img" aria-label="heart">❤️</span> 
                    <span>{likes}</span>
                </div>
            </div>

            {/* Optional tape effect */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-yellow-200 opacity-60 rounded-sm shadow-sm rotate-12"></div>
        </div>
    );
}