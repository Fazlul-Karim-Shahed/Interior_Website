"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import GlowBtn from "../../Common/GlowBtn";
import Link from "next/link";
import { getSettingsApi } from "@/src/api/settingsApi";

export default function HeroSection() {
    const [slides, setSlides] = useState([]);
    const [current, setCurrent] = useState(0);

    // Fetch server images
    useEffect(() => {
        const loadBanners = async () => {
            try {
                const res = await getSettingsApi();
                if (!res.error && res.data?.sliderImages?.length > 0) {
                    const serverSlides = res.data.sliderImages.map((item, index) => ({
                        src: item.url,
                        alt: item.alt || `Interior ${index + 1}`,
                    }));
                    setSlides(serverSlides);
                } else {
                    // Fallback images if server has none
                    setSlides([
                        { src: "/banner.jpg", alt: "Interior 1" },
                        { src: "/22.jpg", alt: "Interior 2" },
                    ]);
                }
            } catch (err) {
                console.error("Failed to load banners, using defaults:", err);
                setSlides([
                    { src: "/banner.jpg", alt: "Interior 1" },
                    { src: "/22.jpg", alt: "Interior 2" },
                ]);
            }
        };
        loadBanners();
    }, []);

    // Auto-slide
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <section className="relative h-[78vh] md:h-[87vh] w-full overflow-hidden bg-black text-white">
            {/* Slider track */}
            <div className="flex h-full transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
                {slides.map((slide, index) => (
                    <div key={index} className="relative w-full h-full flex-shrink-0">
                        <Image src={slide.src} alt={slide.alt} fill style={{ objectFit: "cover" }} priority sizes="100vw" quality={100} unoptimized={true} />
                    </div>
                ))}
            </div>

            {/* Overlay content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 bg-black/40">
                <h1 className="text-3xl md:text-6xl font-bold mb-3 shine-text py-3">Transform Your Living Space</h1>

                <p className="text-md md:text-xl mb-6">Elegant and functional interior design tailored to your vision.</p>
                <GlowBtn effect="slide_from_left" animation color="primary" size={{ sm: "md", md: "lg" }}>
                    <Link href={"/contact"}>Book Free Consultation</Link>
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
