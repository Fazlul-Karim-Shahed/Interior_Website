"use client";

import { getAllClientsApi } from "@/src/api/ClientApi";
import React, { useEffect, useRef, useState } from "react";

export default function Client() {
    const [clients, setClients] = useState([]);
    const containerRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const scrollInterval = useRef(null);

    const scrollStepInterval = 5000;
    const cardWidth = 160 + 24; // 160px + 24px gap

    // Fetch clients from API
    useEffect(() => {
        async function fetchClients() {
            try {
                getAllClientsApi().then((data) => {
                    if (data.error) {
                        setClients([]);
                    } else {
                        setClients(data.data);
                    }
                });
            } catch (error) {
                console.error("Error fetching clients:", error);
            }
        }
        fetchClients();
    }, []);

    // Start auto scroll only after clients loaded and DOM updated
    useEffect(() => {
        if (clients.length === 0) return;

        const timeout = setTimeout(() => {
            startAutoScroll();
        }, 300);

        return () => {
            clearTimeout(timeout);
            clearInterval(scrollInterval.current);
        };
    }, [clients]);

    const startAutoScroll = () => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const scrollLoopLength = container.scrollWidth / 2;

        scrollInterval.current = setInterval(() => {
            if (isDragging.current) return;

            let newScrollLeft = container.scrollLeft + cardWidth;

            if (newScrollLeft >= scrollLoopLength) {
                container.scrollLeft = container.scrollLeft - scrollLoopLength;
                newScrollLeft = container.scrollLeft + cardWidth;
            }

            container.scrollTo({
                left: newScrollLeft,
                behavior: "smooth",
            });
        }, scrollStepInterval);
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const onMouseDown = (e) => {
            isDragging.current = true;
            startX.current = e.pageX - container.offsetLeft;
            scrollLeft.current = container.scrollLeft;
            container.style.cursor = "grabbing";
        };

        const onMouseMove = (e) => {
            if (!isDragging.current) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (startX.current - x) * 1;
            container.scrollLeft = scrollLeft.current + walk;
        };

        const onMouseUp = () => {
            isDragging.current = false;
            container.style.cursor = "grab";
        };

        const onMouseLeave = () => {
            isDragging.current = false;
            container.style.cursor = "grab";
        };

        const onTouchStart = (e) => {
            isDragging.current = true;
            startX.current = e.touches[0].pageX - container.offsetLeft;
            scrollLeft.current = container.scrollLeft;
        };

        const onTouchMove = (e) => {
            if (!isDragging.current) return;
            const x = e.touches[0].pageX - container.offsetLeft;
            const walk = (startX.current - x) * 1;
            container.scrollLeft = scrollLeft.current + walk;
        };

        const onTouchEnd = () => {
            isDragging.current = false;
        };

        container.addEventListener("mousedown", onMouseDown);
        container.addEventListener("mousemove", onMouseMove);
        container.addEventListener("mouseup", onMouseUp);
        container.addEventListener("mouseleave", onMouseLeave);

        container.addEventListener("touchstart", onTouchStart);
        container.addEventListener("touchmove", onTouchMove);
        container.addEventListener("touchend", onTouchEnd);

        container.style.cursor = "grab";
        container.style.overflowX = "auto";
        container.style.scrollbarWidth = "none";
        container.style.msOverflowStyle = "none";
        container.classList.add("no-scrollbar");

        return () => {
            container.removeEventListener("mousedown", onMouseDown);
            container.removeEventListener("mousemove", onMouseMove);
            container.removeEventListener("mouseup", onMouseUp);
            container.removeEventListener("mouseleave", onMouseLeave);

            container.removeEventListener("touchstart", onTouchStart);
            container.removeEventListener("touchmove", onTouchMove);
            container.removeEventListener("touchend", onTouchEnd);
        };
    }, []);

    // Duplicate client list if too short
    const repeatedClients = clients.length < 6 ? [...clients, ...clients, ...clients] : clients;
    const duplicatedClients = [...repeatedClients, ...repeatedClients];

    return (
        <section className="pt-10 pb-20 px-4 ">
            <h2 className="text-3xl font-bold text-brand-900 mb-12 text-center">Our Trusted Clients</h2>
            <div
                ref={containerRef}
                className="flex gap-6 overflow-x-auto no-scrollbar select-none"
                style={{
                    WebkitOverflowScrolling: "touch",
                    scrollSnapType: "none",
                }}
            >
                {duplicatedClients.map(({ name, image }, idx) => (
                    <div key={idx} className="flex-shrink-0 w-40 md:w-52 lg:w-64 flex flex-col items-center cursor-default">
                        <img src={image.url} alt={name} className="w-32 md:w-40 h-32 md:h-40 rounded-full border border-brand-400 shadow-md mb-3" draggable={false} />
                        <p className="text-brand-800 text-sm font-medium text-center">{name}</p>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
}
