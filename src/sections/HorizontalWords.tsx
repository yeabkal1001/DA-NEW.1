'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThumbsUp, MousePointer2, Smartphone } from 'lucide-react';
import { gsapManager } from '@/src/lib/gsapManager';
import '@/app/styles/horizontal-words.css';

gsap.registerPlugin(ScrollTrigger);

const HorizontalWords = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const lettersRef = useRef<HTMLDivElement[]>([]);
    const iconsRef = useRef<HTMLDivElement[]>([]);
    const arrowsRef = useRef<SVGPathElement[]>([]);

    useEffect(() => {
        gsapManager.createContext("horizontal-words-section", () => {
            const container = sectionRef.current;
            const textElement = textRef.current;
            if (!container || !textElement) return;

            const letters = lettersRef.current.filter(Boolean);
            const icons = iconsRef.current.filter(Boolean);
            const arrows = arrowsRef.current.filter(Boolean);

            // --- ENTRANCE & PINNING LOGIC ---
            const entranceDistance = window.innerHeight;
            const pinnedDistance = 2500;

            const scrollTween = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top bottom",
                    end: () => `+=${entranceDistance + pinnedDistance}`,
                    scrub: 1,
                    invalidateOnRefresh: true,
                }
            });

            scrollTween
                .fromTo(textElement, {
                    x: window.innerWidth // Start words off-screen right
                }, {
                    x: window.innerWidth * 0.5,
                    ease: "none",
                    duration: entranceDistance
                })
                .to(textElement, {
                    x: () => -(textElement.scrollWidth - window.innerWidth * 0.5),
                    ease: "none",
                    duration: pinnedDistance
                });

            // Separate pinning logic so it only locks when the section hits the top
            ScrollTrigger.create({
                trigger: container,
                start: "top top",
                end: () => `+=${pinnedDistance}`,
                pin: true,
                pinSpacing: true,
                invalidateOnRefresh: true
            });

            // Bounce each letter randomly
            letters.forEach((letter) => {
                gsap.from(letter, {
                    yPercent: (Math.random() - 0.5) * 500,
                    rotation: (Math.random() - 0.5) * 60,
                    ease: "elastic.out(1.2, 1)",
                    scrollTrigger: {
                        trigger: letter,
                        containerAnimation: scrollTween,
                        start: 'left 90%',
                        end: 'left 50%',
                        scrub: 0.5
                    }
                });
            });

            // Bounce icons
            icons.forEach((icon) => {
                gsap.from(icon, {
                    scale: 0,
                    yPercent: (Math.random() - 0.5) * 400,
                    rotation: (Math.random() - 0.5) * 60,
                    ease: "elastic.out(1.2, 1)",
                    scrollTrigger: {
                        trigger: icon,
                        containerAnimation: scrollTween,
                        start: 'left 90%',
                        end: 'left 50%',
                        scrub: 0.5
                    }
                });
            });

            // Animate Drawing SVG Arrows 
            arrows.forEach((arrowPath) => {
                if (arrowPath.getTotalLength) {
                    const pathLen = arrowPath.getTotalLength();
                    gsap.set(arrowPath, { strokeDasharray: pathLen, strokeDashoffset: pathLen });
                    gsap.to(arrowPath, {
                        strokeDashoffset: 0,
                        duration: 1,
                        scrollTrigger: {
                            trigger: arrowPath.parentElement,
                            containerAnimation: scrollTween,
                            start: 'left 90%',
                            end: 'left 50%',
                            scrub: 0.5
                        }
                    });
                }
            });

        }, sectionRef.current || undefined);

        return () => {
            gsapManager.killContext("horizontal-words-section");
        };
    }, []);

    const text = "We wanna be where the people are";

    return (
        <section ref={sectionRef} className="horizontal-words-section content-section">
            <div ref={textRef} className="horizontal-words__relative">
                <div className="horizontal-words__sticker-svg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 386 127" fill="none" className="horizontal-words__arrow-svg">
                        <path ref={el => { if (el) arrowsRef.current[0] = el; }} d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L356.5 105.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <path ref={el => { if (el) arrowsRef.current[1] = el; }} d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L384 97" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    
                    <div ref={el => { if (el) iconsRef.current[0] = el; }} className="horizontal-words__icon bg-lime/10 p-4 rounded-2xl text-lime border border-lime/20 shadow-[0_0_30px_rgba(204,255,0,0.2)]">
                        <ThumbsUp size={48} strokeWidth={1.5} />
                    </div>
                    
                    <div ref={el => { if (el) iconsRef.current[1] = el; }} className="horizontal-words__icon bg-white/5 p-4 rounded-2xl text-white border border-white/10">
                        <MousePointer2 size={48} strokeWidth={1.5} />
                    </div>
                    
                    <div ref={el => { if (el) iconsRef.current[2] = el; }} className="horizontal-words__icon bg-white/5 p-4 rounded-2xl text-white border border-white/10">
                        <Smartphone size={48} strokeWidth={1.5} />
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 140 127" fill="none" className="horizontal-words__arrow-end-svg">
                        <path ref={el => { if (el) arrowsRef.current[2] = el; }} d="M2.03125 2.42188C100.469 2.42188 130.156 52.4219 118.437 125.078L99.6875 107.891" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <path ref={el => { if (el) arrowsRef.current[3] = el; }} d="M2.03125 2.42188C100.469 2.42188 130.156 52.4219 118.438 125.078L137.969 110.234" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    <h2 className="display horizontal-words__h2" aria-label={text}>
                        {Array.from(text).map((char, i) => (
                            <div key={i} ref={el => { if (el) lettersRef.current[i] = el; }} className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>
                                {char === " " ? "\u00A0" : char}
                            </div>
                        ))}
                    </h2>
                </div>
            </div>

            <div className="horizontal-words__bottom-text">
                <div className="horizontal-words__bottom-text-l text-center mx-auto">
                    Audiences are more scattered <em>and</em> more reachable<br />
                    than ever. We help brands become leaders on the<br />
                    channels of the new mainstream.
                </div>
            </div>
        </section>
    );
};

export default HorizontalWords;
