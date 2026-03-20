'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
        document.body.style.overflow = '';
      }
    });

    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    // Initial entrance
    tl.set(".loader-bg", { scaleY: 1 })
      .to(".loader-content", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      })
      .to(".loader-bg", {
        scaleY: 0,
        duration: 1.0,
        ease: "expo.inOut",
        delay: 2.2,
        transformOrigin: "top"
      })
      .to(".loader-container", {
        autoAlpha: 0,
        duration: 0.1
      });

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="loader-container fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto">
      {/* Background layer */}
      <div className="loader-bg absolute inset-0 bg-black" />
      
      {/* Content wrapper */}
      <div className="loader-content relative z-10 text-center opacity-0 translate-y-10">
        <div className="mb-8">
          <img 
            src="/dalogo.webp" 
            alt="Digital Addis" 
            className="h-16 md:h-24 mx-auto object-contain brightness-0 invert" 
          />
        </div>
        
        <div className="relative overflow-hidden mb-4">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
            Digital <span className="text-lime italic">Addis</span>
          </h2>
        </div>
        
        {/* Progress bar */}
        <div className="w-48 h-[2px] bg-white/10 mx-auto relative overflow-hidden">
          <div 
            className="absolute inset-y-0 left-0 bg-lime transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="mt-4">
          <span className="text-lime text-[10px] font-black uppercase tracking-[0.4em]">
            {progress}% Loading Experience
          </span>
        </div>
      </div>
    </div>
  );
}
