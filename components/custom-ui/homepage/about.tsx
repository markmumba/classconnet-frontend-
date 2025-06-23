import Image from 'next/image';
import React from 'react';




export default function About() {
    return (
        <section className="w-full max-w-4xl mx-auto py-14 px-2 sm:px-4">
            <Image
                src="/hero.jpg"
                alt="Class group"
                className="w-full h-32 sm:h-40 object-cover object-top rounded-xl mb-8 shadow-md border border-gray-100"
                width={600}
                height={800}
            />
            <h2 className="font-bold text-xl sm:text-2xl md:text-3xl mb-4 text-blue-700 flex items-center gap-2">
                <span role="img" aria-label="document">📄</span> About <span className="font-script italic">ClassConnect</span>
            </h2>
            <div className="mb-5">
                <h3 className="text-base sm:text-lg font-semibold mb-1 text-gray-700 flex items-center gap-2">
                    <span role="img" aria-label="target">🎯</span> Objective
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                    A social, interactive online yearbook for graduating classes to share memories, favorites, aspirations, and build lasting connections.
                </p>
            </div>
            <div className="mb-5">
                <h3 className="text-base sm:text-lg font-semibold mb-1 text-gray-700 flex items-center gap-2">
                    <span role="img" aria-label="audience">🎓</span> Target Audience
                </h3>
                <ul className="list-disc list-inside text-gray-600 text-sm sm:text-base">
                    <li>Graduating students of a school/university</li>
                    <li>Alumni (optionally later)</li>
                </ul>
            </div>
            <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-700 flex items-center gap-2">
                    <span role="img" aria-label="features">✨</span> Key Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                    <Feature icon="🔐" title="Authentication" desc="Sign up with school email, login/logout." />
                    <Feature icon="👤" title="Profile Setup" desc="Upload photo, add quote, answer fun questions, state aspirations." />
                    <Feature icon="🤝" title="Social Graph" desc="Add friends, visualize your clique, share invites." />
                    <Feature icon="💬" title="Quote Interaction" desc="Like quotes, see the most liked quote." />
                    <Feature icon="🔍" title="Explore Classmates" desc="Filter by path or school, view daily student grid." />
                    <Feature icon="💌" title="Invite System" desc="Send invites, track invited friends." />
                </div>
            </div>
        </section>
    );
}

function Feature({ icon, title, desc }: { icon: string; title: string; desc: string }) {
    return (
        <div className="flex items-start gap-3 bg-blue-50/60 rounded-xl p-3 border border-blue-100">
            <span className="text-2xl mt-1">{icon}</span>
            <div>
                <h4 className="font-semibold text-base text-gray-800 mb-0.5">{title}</h4>
                <p className="text-gray-600 text-sm">{desc}</p>
            </div>
        </div>
    );
}

