import { useEffect, useRef, useState } from "react";


interface FadeInUpProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    distance?: number;
    threshold?: number;
    className?: string;
    once?: boolean;
  }


export function FadeInUpCSS({
    children,
    delay = 0,
    duration = 800,
    distance = 30,
    threshold = 0.1,
    className = '',
    once = true
  }: FadeInUpProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && (!once || !hasTriggered)) {
            setIsVisible(true);
            if (once) {
              setHasTriggered(true);
            }
          } else if (!once && !entry.isIntersecting) {
            setIsVisible(false);
          }
        },
        {
          threshold,
          rootMargin: '0px',
        }
      );
  
      if (elementRef.current) {
        observer.observe(elementRef.current);
      }
  
      return () => {
        if (elementRef.current) {
          observer.unobserve(elementRef.current);
        }
      };
    }, [threshold, once, hasTriggered]);
  
    return (
      <>
        <div
          ref={elementRef}
          className={`
            opacity-0 translate-y-8 transition-all ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : ''}
            ${className}
          `}
          style={{
            transitionDuration: `${duration}ms`,
            transitionDelay: `${delay}ms`,
            transform: isVisible ? 'translateY(0)' : `translateY(${distance}px)`,
          }}
        >
          {children}
        </div>
      </>
    );
  }
  