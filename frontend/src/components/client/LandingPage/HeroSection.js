"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "@/public/banner.jpg";

const slides = [
    { src: Logo, alt: "Interior 1" },
    { src: Logo, alt: "Interior 2" },
    { src: Logo, alt: "Interior 3" },
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
        <section className="relative h-[90vh] w-full overflow-hidden bg-black text-white">
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
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Transform Your Living Space</h1>
                <p className="text-lg md:text-xl mb-6">Elegant and functional interior design tailored to your vision.</p>
                <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 transition rounded text-white font-medium">Book Free Consultation</button>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-6 w-full flex justify-center gap-2 z-20">
                {slides.map((_, index) => (
                    <div key={index} onClick={() => setCurrent(index)} className={`h-3 w-3 rounded-full cursor-pointer transition ${current === index ? "bg-white" : "bg-white/50"}`} />
                ))}
            </div>
        </section>
    );
}