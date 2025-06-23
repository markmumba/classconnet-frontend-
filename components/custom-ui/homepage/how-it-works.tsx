import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: '🎓',
    title: 'Sign Up',
    desc: 'Join with your school email and get started instantly.'
  },
  {
    icon: '🖼️',
    title: 'Create Your Profile',
    desc: 'Add your photo, personal quote, and favorite things.'
  },
  {
    icon: '🤝',
    title: 'Connect',
    desc: 'Find classmates, like quotes, and build your clique.'
  },
  {
    icon: '💬',
    title: 'Share Memories',
    desc: 'Post stories, celebrate your class, and make it unforgettable.'
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full max-w-5xl mx-auto py-16 px-2 sm:px-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-8 text-center flex items-center justify-center gap-2">
        <span role="img" aria-label="compass">🧭</span> How It Works
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8">
        {steps.map((step, idx) => (
          <Card key={idx} className="flex flex-col items-center text-center py-6 px-4 h-full shadow-md hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-col items-center">
              <span className="text-4xl mb-2">{step.icon}</span>
              <CardTitle className="text-lg font-semibold mb-1">{step.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <CardDescription className="text-gray-600 text-sm">{step.desc}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center">
        <Button size="lg" className="bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition-all">
          Get Started
        </Button>
      </div>
    </section>
  );
}
 