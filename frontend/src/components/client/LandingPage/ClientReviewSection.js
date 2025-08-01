"use client";

import { faArrowLeft, faArrowRight, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";
import GlowBtn from "../../Common/GlowBtn";
import { getAllReviewsApi } from "@/src/api/ReviewApi";

// Duplicate the reviews array to enable seamless infinite scroll

export default function ClientReviewSection() {
    const containerRef = useRef(null);
    const [slidesToShow, setSlidesToShow] = useState(1);
    const [slideWidth, setSlideWidth] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [reviews, setReviews] = useState([]);

    

    // Set slidesToShow based on viewport width
    useEffect(() => {

        getAllReviewsApi().then(data => {
            if (data.error) {
                setReviews([]);
            } else {
                setReviews(data.data);
            }
        })



        function updateSlidesToShow() {
            if (window.innerWidth >= 1024) setSlidesToShow(3);
            else if (window.innerWidth >= 640) setSlidesToShow(2);
            else setSlidesToShow(1);
        }
        updateSlidesToShow();
        window.addEventListener("resize", updateSlidesToShow);
        return () => window.removeEventListener("resize", updateSlidesToShow);
    }, []);

    const duplicatedReviews = [...reviews, ...reviews];

    // Set slideWidth in px dynamically after render and on slidesToShow change
    useEffect(() => {
        function updateSlideWidth() {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth;
                setSlideWidth(width / slidesToShow);
            }
        }
        updateSlideWidth();
        window.addEventListener("resize", updateSlideWidth);
        return () => window.removeEventListener("resize", updateSlideWidth);
    }, [slidesToShow]);

    // Position tracker for continuous scroll
    const positionRef = useRef(0);
    const requestRef = useRef();

    // Continuous scroll speed in px per frame (adjust for speed)
    const speed = 0.5;

    // Animate the slider continuously unless hovered
    const animate = () => {
        if (!isHovered) {
            positionRef.current -= speed;
            // When scrolled past half (because we duplicated slides), reset position
            if (Math.abs(positionRef.current) >= slideWidth * reviews.length) {
                positionRef.current = 0;
            }
            if (containerRef.current) {
                containerRef.current.style.transform = `translateX(${positionRef.current}px)`;
            }
        }
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        if (slideWidth === 0) return;
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [slideWidth, isHovered]);

    // Manual slide functions — jump by one slide width left or right
    const manualSlide = (direction) => {
        setIsHovered(true); // pause auto-scroll while manually sliding
        positionRef.current += direction * slideWidth;
        // keep position within bounds
        if (positionRef.current > 0) {
            positionRef.current = -(slideWidth * reviews.length);
        } else if (Math.abs(positionRef.current) >= slideWidth * reviews.length) {
            positionRef.current = 0;
        }
        if (containerRef.current) {
            containerRef.current.style.transform = `translateX(${positionRef.current}px)`;
        }
        // resume auto scroll after a delay
        setTimeout(() => setIsHovered(false), 4000);
    };

    return (
        <section className="pt-10 pb-5 px-6 md:px-20  relative overflow-hidden select-none">
            <h2 className="text-4xl font-extrabold text-brand-900 mb-16 text-center tracking-wide">What Our Clients Say</h2>

            <div className="relative max-w-7xl mx-auto">
                {/* Slider viewport */}
                <div className="flex will-change-transform cursor-grab" ref={containerRef} style={{ userSelect: "none" }}>
                    {duplicatedReviews.map(({ name, customerDesignation, customerImage, review }, idx) => (
                        <div key={idx} className="p-6 flex-shrink-0" style={{ width: `${slideWidth}px`, boxSizing: "border-box" }}>
                            <div
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                className="bg-white/30 backdrop-blur-md rounded-3xl p-8 shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-shadow duration-500 h-full flex flex-col justify-between"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-brand-400 opacity-30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M7.17 6A5.002 5.002 0 0 1 12 11v7h-3v-7a2 2 0 1 0-1.83-5zM17.17 6A5.002 5.002 0 0 1 22 11v7h-3v-7a2 2 0 1 0-1.83-5z" />
                                </svg>

                                <p className="text-brand-800 italic mb-8 flex-grow">{review}</p>

                                <div className="flex items-center space-x-4">
                                    <img src={customerImage.url} alt={name} className="w-16 h-16 rounded-full border-4 border-brand-500 shadow-lg flex-shrink-0" />
                                    <div>
                                        <h3 className="text-brand-900 font-bold text-lg">{name}</h3>
                                        <p className="text-brand-700 text-sm">{customerDesignation}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-5 flex justify-center">
                    <div>
                        <GlowBtn effect="" color="neutral" radius="100rem" shadow={false} size={{ sm: "sm", md: "sm", lg: "md" }} onClick={() => manualSlide(1)} aria-label="Previous Reviews">
                            <FontAwesomeIcon icon={faArrowLeft} className="text-inherit w-4 h-4" />
                        </GlowBtn>
                    </div>

                    <div>
                        <GlowBtn effect="" color="neutral" radius="100rem" shadow={false} size={{ sm: "sm", md: "sm", lg: "md" }} onClick={() => manualSlide(-1)} aria-label="Next Reviews">
                            <FontAwesomeIcon icon={faArrowRight} className="text-inherit w-4 h-4" />
                        </GlowBtn>
                    </div>
                </div>
            </div>
        </section>
    );
}
