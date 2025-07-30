"use client";

import React, { useEffect, useRef } from "react";

const clients = [
  { name: "Sarah Johnson", photo: "https://randomuser.me/api/portraits/women/65.jpg" },
  { name: "Mark Thompson", photo: "https://randomuser.me/api/portraits/men/44.jpg" },
  { name: "Lisa Martinez", photo: "https://randomuser.me/api/portraits/women/22.jpg" },
  { name: "James Anderson", photo: "https://randomuser.me/api/portraits/men/30.jpg" },
  { name: "Anna Williams", photo: "https://randomuser.me/api/portraits/women/47.jpg" },
  { name: "David Brown", photo: "https://randomuser.me/api/portraits/men/55.jpg" },
];

const duplicatedClients = [...clients, ...clients];

export default function Client() {
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const scrollInterval = useRef(null);

  // Scroll interval in ms and card width in px (must match the CSS width + gap)
  const scrollStepInterval = 5000;
  const cardWidth = 160 + 24; // card width (w-40 = 160px) + gap-6 (24px)

  // Auto scroll function: scroll by one card every scrollStepInterval
  const startAutoScroll = () => {
    if (!containerRef.current) return;

    scrollInterval.current = setInterval(() => {
      if (isDragging.current) return; // pause auto scroll on drag

      const container = containerRef.current;
      const maxScrollLeft = container.scrollWidth / 2;

      let newScrollLeft = container.scrollLeft + cardWidth;

      if (newScrollLeft >= maxScrollLeft) {
        // Reset instantly to start without animation
        container.scrollLeft = 0;
        newScrollLeft = cardWidth;
      }

      // Smooth scroll to new position
      container.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }, scrollStepInterval);
  };

  useEffect(() => {
    startAutoScroll();

    return () => clearInterval(scrollInterval.current);
  }, []);

  // Manual drag handlers (same as before)
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

    // Hide scrollbar for all browsers
    container.style.scrollbarWidth = "none"; // Firefox
    container.style.msOverflowStyle = "none"; // IE 10+
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

  return (
      <section className="pt-10 pb-5 px-4 bg-gradient-to-br from-brand-50 to-white">
          <h2 className="text-3xl font-bold text-brand-900 mb-12 text-center">Our Trusted Clients</h2>
          <div
              ref={containerRef}
              className="flex gap-6 overflow-x-auto no-scrollbar select-none"
              style={{
                  WebkitOverflowScrolling: "touch",
                  scrollSnapType: "none",
              }}
          >
              {duplicatedClients.map(({ name, photo }, idx) => (
                  <div key={idx} className="flex-shrink-0 w-40 md:w-52 lg:w-64 flex flex-col items-center cursor-default">
                      <img src={photo} alt={name} className="w-32 md:w-40 h-32 md:h-40 rounded-full border-4 border-brand-400 shadow-md mb-3" draggable={false} />
                      <p className="text-brand-800 text-sm font-medium text-center">{name}</p>
                  </div>
              ))}
          </div>

          <style jsx>{`
              /* Hide scrollbar */
              .no-scrollbar::-webkit-scrollbar {
                  display: none;
              }
          `}</style>
      </section>
  );
}
