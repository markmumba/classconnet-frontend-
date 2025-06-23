import Image from 'next/image';
import React from 'react';



export default function Hero() {
    return (
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-pink-50 pb-16 px-2">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-1/2 h-1/3 bg-blue-100 rounded-full blur-3xl opacity-40 animate-fadeIn" />
                <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-pink-100 rounded-full blur-2xl opacity-40 animate-fadeIn delay-200" />
            </div>
            <div className="relative z-10 flex flex-col items-center text-center mt-12 animate-fadeIn">
                <span className="inline-block mb-3 px-5 py-2 rounded-full bg-blue-600/90 text-white font-bold tracking-wide text-lg sm:text-xl md:text-2xl shadow-md border border-blue-700/20">
                    ClassConnect
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-2 text-gray-900 drop-shadow-lg">
                    Your Class. Your Story. <span className="italic font-script text-blue-700">Forever Online.</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 max-w-xl">
                    A modern, social yearbook for your class. Share memories, connect, and celebrate your journey together.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-4">
                    <button className="px-7 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 hover:scale-105 transition-all border border-blue-700/20 backdrop-blur-sm focus:ring-2 focus:ring-blue-400">
                        Upload Your Story
                    </button>
                    <button className="px-7 py-3 rounded-xl bg-white/80 text-blue-700 font-semibold shadow-md hover:bg-blue-100 hover:scale-105 transition-all border border-blue-700/10 backdrop-blur-sm focus:ring-2 focus:ring-blue-200">
                        Sign Up with School Email
                    </button>
                </div>
                <span className="inline-block mt-2 px-4 py-1 rounded-full bg-pink-100 text-pink-700 font-medium text-sm shadow border border-pink-200 animate-bounce-slow">
                    ❤️ Top liked quotes today
                </span>
            </div>
            <div className="relative z-20 mt-10 animate-fadeInUp mb-4 w-full flex justify-center">
                <div className="card w-full max-w-xs sm:max-w-sm md:w-96 mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 rotate-[-3deg]">
                    <Image
                        src="/chef.jpg"
                        alt="Featured Student"
                        className="w-full h-48 sm:h-56 md:h-64 object-cover object-top rounded-t-2xl"
                        width={800}
                        height={800}
                    />
                    <div className="p-4 w-full flex flex-col items-center">
                        <span className="font-bold text-base sm:text-lg text-gray-900 mb-1">Alexander </span>
                        <span className="italic text-blue-700 text-sm sm:text-base text-center mb-2">"You must be imaginative strong hearted , you must try things that may not work and you must not let anyone define your limits because of where you come from, your only limit is your soul. Only the fearless can be great."</span>
                        <span className="text-xs text-gray-400">Class of 2024</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Sticker({ icon, label }: { icon: string; label: string }) {
    return (
        <div className="flex flex-col items-center bg-white/90 rounded-full px-4 py-3 shadow-lg border-2 border-white/70 min-w-[70px] transition-transform duration-200 hover:scale-110 hover:-translate-y-2 animate-bounceSticker cursor-pointer">
            <span className="text-2xl mb-1 drop-shadow-sm">{icon}</span>
            <span className="text-xs font-semibold text-gray-700">{label}</span>
        </div>
    );
}

