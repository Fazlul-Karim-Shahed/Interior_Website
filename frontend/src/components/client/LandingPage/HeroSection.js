"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import banner1 from "@/public/banner.jpg";
import banner2 from "@/public/22.jpg";
import GlowBtn from "../../Common/GlowBtn";

const slides = [
    { src: banner1, alt: "Interior 1" },
    { src: banner2, alt: "Interior 2" },
];

export default function HeroSection() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-[78vh] md:h-[87vh] w-full overflow-hidden bg-black text-white">
            {/* Slider track */}
            <div className="flex h-full transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
                {slides.map((slide, index) => (
                    <div key={index} className="relative min-w-full h-full">
                        <Image
                            src={slide.src}
                            alt={slide.alt}
                            fill
                            priority
                            sizes="100vw"
                            className={`object-cover object-center w-full h-full transition-transform duration-[5000ms] ${current === index ? "scale-105" : "scale-100"}`}
                        />
                    </div>
                ))}
            </div>

            {/* Overlay content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 bg-black/40">
                <h1 className="text-3xl md:text-6xl font-bold mb-3 shine-text py-3">Transform Your Living Space</h1>

                <p className="text-md md:text-xl mb-6">Elegant and functional interior design tailored to your vision.</p>
                <GlowBtn effect="slide_from_left" animation color="primary" size={{ sm: "md", md: "lg" }}>
                    Book Free Consultation
                </GlowBtn>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-6 w-full flex justify-center gap-2 z-20">
                {slides.map((_, index) => (
                    <div key={index} onClick={() => setCurrent(index)} className={`h-3 w-3 rounded-full cursor-pointer transition ${current === index ? "bg-cyan-500" : "bg-cyan-500/50"}`} />
                ))}
            </div>

            <style jsx>{`
                .shine-text {
                    position: relative;
                    background: linear-gradient(90deg, var(--color-cyan-200), var(--color-cyan-400), var(--color-cyan-400), var(--color-cyan-400), var(--color-cyan-200));
                    background-size: 200% 100%;
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: shine-slide 5s linear infinite;
                }

                @keyframes shine-slide {
                    0% {
                        background-position: 200% 0;
                    }
                    100% {
                        background-position: -200% 0;
                    }
                }
            `}</style>
        </section>
    );
}
