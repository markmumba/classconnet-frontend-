'use client'

import { useState, useRef } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <section className="relative w-full min-h-screen flex flex-col lg:flex-row items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 pb-16 px-4 lg:px-8">
            {/* Audio element */}
            <audio
                ref={audioRef}
                loop
                onEnded={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            >
                <source src="/audio/ambient-music.mp3" type="audio/mpeg" />
                <source src="/audio/ambient-music.ogg" type="audio/ogg" />
                Your browser does not support the audio element.
            </audio>

            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-1/2 h-1/3 bg-blue-100 rounded-full blur-3xl opacity-40 animate-fadeIn" />
                <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-pink-100 rounded-full blur-2xl opacity-40 animate-fadeIn delay-200" />
            </div>

            {/* Left side - Text content */}
            <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left mt-12 lg:mt-0 lg:w-1/2 lg:pr-8">
                <span className="inline-block mb-3 px-5 py-2 rounded-full bg-blue-600/90 text-white font-bold tracking-wide text-lg sm:text-xl md:text-2xl shadow-md border border-blue-700/20">
                    ClassConnect
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-gray-900 drop-shadow-lg">
                    Your Class. Your Story. <span className="italic font-script text-blue-700">Forever Online.</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 max-w-xl">
                    A modern, social yearbook for your class. Share memories, connect, and celebrate your journey together.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start mb-4">
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

                {/* Handwritten text overlay */}
                <div className="hidden lg:block absolute top-1/2 right-[-100px] transform -translate-y-1/2 rotate-12 z-30">
                    <p className="text-3xl font-handwriting text-gray-800 opacity-80">
                        Memories are
                        <br />
                        <span className="text-4xl">forever</span>
                    </p>
                </div>
            </div>

            {/* Right side - Polaroid collage */}
            <div className="relative z-20 mt-10 lg:mt-0 lg:w-1/2 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-lg h-96 lg:h-[500px]">

                    {/* Background polaroids */}
                    <div className="absolute top-0 left-8 w-48 h-56 bg-white rounded-lg shadow-lg transform rotate-[-15deg] z-10 border-8 border-white">
                        <div className="w-full h-40 bg-gradient-to-br from-blue-200 to-blue-300 rounded-t"></div>
                        <div className="p-3 text-center">
                            <p className="text-sm text-gray-600 ">Summer vibes!</p>
                        </div>
                    </div>

                    <div className="absolute top-12 right-4 w-44 h-52 bg-white rounded-lg shadow-lg transform rotate-[18deg] z-10 border-8 border-white">
                        <div className="w-full h-36 bg-gradient-to-br from-pink-200 to-pink-300 rounded-t"></div>
                        <div className="p-3 text-center">
                            <p className="text-sm text-gray-600 ">Best friends</p>
                        </div>
                    </div>

                    <div className="absolute bottom-8 left-2 w-46 h-54 bg-white rounded-lg shadow-lg transform rotate-[-8deg] z-10 border-8 border-white">
                        <div className="w-full h-38 bg-gradient-to-br from-green-200 to-green-300 rounded-t"></div>
                        <div className="p-3 text-center">
                            <p className="text-sm text-gray-600 ">Study group</p>
                        </div>
                    </div>

                    <div className="absolute bottom-4 right-8 w-42 h-50 bg-white rounded-lg shadow-lg transform rotate-[12deg] z-10 border-8 border-white">
                        <div className="w-full h-34 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-t"></div>
                        <div className="p-3 text-center">
                            <p className="text-sm text-gray-600 ">Graduation!</p>
                        </div>
                    </div>

                    <div className="absolute top-24 left-20 w-40 h-48 bg-white rounded-lg shadow-lg transform rotate-[25deg] z-10 border-8 border-white">
                        <div className="w-full h-32 bg-gradient-to-br from-purple-200 to-purple-300 rounded-t"></div>
                        <div className="p-3 text-center">
                            <p className="text-sm text-gray-600 ">Prom night</p>
                        </div>
                    </div>

                    {/* Main featured polaroid */}
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-56  bg-white rounded-lg shadow-2xl rotate-[-3deg] z-30 border-8 border-white hover:scale-105 hover:shadow-3xl transition-all duration-300">
                        <div className="w-full h-48 bg-gray-100 rounded-t overflow-hidden">
                            <Image
                                src="/denzel.jpeg"
                                alt="Featured Student"
                                className="w-full h-full object-cover object-top"
                                width={224}
                                height={288}
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    const nextElement = target.nextElementSibling as HTMLElement;
                                    if (nextElement) {
                                        nextElement.style.display = 'flex';
                                    }
                                }}
                            />
                            <div className="w-full h-full bg-gradient-to-br from-blue-300 to-blue-400 hidden items-center justify-center">
                                <span className="text-white text-4xl">📚</span>
                            </div>
                        </div>
                        <div className="p-4 text-center bg-white">
                            <h3 className="font-bold text-lg text-gray-900 mb-1">Alexander</h3>
                            <p className="text-md text-blue-700 italic leading-tight mb-2">
                                "I found that nothing in life is worthwhile unless you take risks"
                            </p>
                            <span className="text-xs text-gray-400">Class of 2024</span>
                        </div>
                    </div>

                    {/* Additional scattered polaroids for depth */}
                    <div className="absolute top-32 right-12 w-36 h-44 bg-white rounded-lg shadow-md transform rotate-[-22deg] z-5 border-6 border-white opacity-80">
                        <div className="w-full h-28 bg-gradient-to-br from-red-200 to-red-300 rounded-t"></div>
                        <div className="p-2 text-center">
                            <p className="text-xs text-gray-600 font-handwriting">Fun times</p>
                        </div>
                    </div>

                    <div className="absolute bottom-16 left-8 w-38 h-46 bg-white rounded-lg shadow-md transform rotate-[15deg] z-5 border-6 border-white opacity-70">
                        <div className="w-full h-30 bg-gradient-to-br from-teal-200 to-teal-300 rounded-t"></div>
                        <div className="p-2 text-center">
                            <p className="text-xs text-gray-600 font-handwriting">Squad</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Audio Player Controls - Bottom Center */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex items-center gap-4 bg-white/90 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-white/50">
                <button
                    onClick={togglePlay}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 hover:scale-110 shadow-md"
                    aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
                >
                    {isPlaying ? (
                        <Pause className="w-5 h-5" />
                    ) : (
                        <Play className="w-5 h-5 ml-0.5" />
                    )}
                </button>

                <button
                    onClick={toggleMute}
                    className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:scale-110 ${isMuted
                        ? 'bg-red-100 text-red-600 hover:bg-red-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                >
                    <Volume2 className="w-4 h-4" />
                </button>

                <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-600 font-medium">
                        {isPlaying ? 'Now Playing' : 'Background Music'}
                    </span>
                    <span className="text-xs text-gray-500">
                        ClassConnect Vibes
                    </span>
                </div>
            </div>

        </section>
    );
}