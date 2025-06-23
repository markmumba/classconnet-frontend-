import React from 'react';
import { Badge } from '../../ui/badge';
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: '🎓',
    title: 'Sign Up',
    desc: 'Join with your school email.'
  },
  {
    icon: '🖼️',
    title: 'Create Profile',
    desc: 'Add your photo, quote, and favorites.'
  },
  {
    icon: '🤝',
    title: 'Connect',
    desc: 'Find classmates, like quotes, build your clique.'
  },
  {
    icon: '💬',
    title: 'Share Memories',
    desc: 'Post stories and celebrate your class.'
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full max-w-3xl md:max-w-6xl lg:max-w-7xl mx-auto py-16 md:py-24 px-2 sm:px-4">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700 mb-10 md:mb-16 text-center flex items-center justify-center gap-2">
        <span role="img" aria-label="compass">🧭</span> How It Works
      </h2>
      <div className="relative min-h-[480px] md:min-h-[500px] lg:min-h-[600px] w-full flex items-center justify-center">
        {/* SVG Road */}
        <svg
          viewBox="0 0 100 100"
          className="absolute w-full h-full left-0 top-0 z-0"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M 50 95 Q 10 75 50 55 Q 90 35 50 15"
            stroke="#60a5fa" strokeWidth="4" strokeLinecap="round" fill="none"
            className="md:stroke-[6] lg:stroke-[8]"
          />
        </svg>
        
        {/* Step 1: Sign Up */}
        <div className="absolute flex flex-col items-center md:items-start" 
             style={{
               top: '90%', left: '50%', transform: 'translate(-50%, -50%)'
             }}
             data-step="1">
          <div className="md:absolute md:top-[-400%] md:left-[-600%] lg:left-[-800%] md:transform-none">
            <Badge className="mb-2 px-4 py-2 text-lg md:text-xl lg:text-2xl md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-full bg-blue-100 text-blue-700 border-blue-300 flex items-center gap-2 shadow-lg">
              <span className="text-2xl md:text-3xl lg:text-4xl mr-1">{steps[0].icon}</span> {steps[0].title}
            </Badge>
            <span className="text-gray-600 text-sm md:text-base lg:text-lg text-center md:text-left max-w-[160px] md:max-w-[200px] lg:max-w-[240px]">{steps[0].desc}</span>
          </div>
        </div>

        {/* Step 2: Create Profile */}
        <div className="absolute flex flex-col items-center md:items-start" 
             style={{
               top: '65%', left: '30%', transform: 'translate(-50%, -50%)'
             }}
             data-step="2">
          <div className="md:absolute md:top-[-250%] md:left-[-100%] lg:top-[-300%] lg:left-[-120%] md:transform-none">
            <Badge className="mb-2 px-4 py-2 text-lg md:text-xl lg:text-2xl md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-full bg-blue-100 text-blue-700 border-blue-300 flex items-center gap-2 shadow-lg">
              <span className="text-2xl md:text-3xl lg:text-4xl mr-1">{steps[1].icon}</span> {steps[1].title}
            </Badge>
            <span className="text-gray-600 text-sm md:text-base lg:text-lg text-center md:text-left max-w-[160px] md:max-w-[200px] lg:max-w-[240px]">{steps[1].desc}</span>
          </div>
        </div>

        {/* Step 3: Connect */}
        <div className="absolute flex flex-col items-center md:items-start" 
             style={{
               top: '35%', left: '70%', transform: 'translate(-50%, -50%)'
             }}
             data-step="3">
          <div className="md:absolute md:top-[0%] md:left-[-50%] lg:top-[20%] lg:left-[-80%] md:transform-none">
            <Badge className="mb-2 px-4 py-2 text-lg md:text-xl lg:text-2xl md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-full bg-blue-100 text-blue-700 border-blue-300 flex items-center gap-2 shadow-lg">
              <span className="text-2xl md:text-3xl lg:text-4xl mr-1">{steps[2].icon}</span> {steps[2].title}
            </Badge>
            <span className="text-gray-600 text-sm md:text-base lg:text-lg text-center md:text-left max-w-[160px] md:max-w-[200px] lg:max-w-[240px]">{steps[2].desc}</span>
          </div>
        </div>

        {/* Step 4: Share Memories */}
        <div className="absolute flex flex-col items-center md:items-start" 
             style={{
               top: '10%', left: '50%', transform: 'translate(-50%, -50%)'
             }}
             data-step="4">
          <div className="md:absolute md:top-[150%] md:left-[500%] lg:top-[200%] lg:left-[600%] md:transform-none">
            <Badge className="mb-2 px-4 py-2 text-lg md:text-xl lg:text-2xl md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-full bg-blue-100 text-blue-700 border-blue-300 flex items-center gap-2 shadow-lg">
              <span className="text-2xl md:text-3xl lg:text-4xl mr-1">{steps[3].icon}</span> {steps[3].title}
            </Badge>
            <span className="text-gray-600 text-sm md:text-base lg:text-lg text-center md:text-left max-w-[160px] md:max-w-[200px] lg:max-w-[240px]">{steps[3].desc}</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-12 md:mt-20">
        <Button size="lg" className="bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition-all text-lg md:text-xl lg:text-2xl px-8 py-4 md:px-12 md:py-6">
          Get Started
        </Button>
      </div>
    </section>
  );
}