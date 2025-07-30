"use client";

import React from "react";

const videos = [
    {
        title: "Modern Home Interior Design",
        url: "https://www.youtube.com/embed/ScMzIvxBSi4",
    },
    {
        title: "Office Workspace Transformation",
        url: "https://www.youtube.com/embed/tgbNymZ7vqY",
    },
    {
        title: "Custom Furniture Making Process",
        url: "https://www.youtube.com/embed/5qap5aO4i9A",
    },
    {
        title: "Creative 3D Layout & Planning",
        url: "https://www.youtube.com/embed/VGrSan3SOI4",
    },
];

export default function ProjectVideoSection() {
    return (
        <section className="pt-10 pb-5 px-6 ">
            <h2 className="text-4xl font-extrabold text-brand-900 mb-16 text-center tracking-wide">Project Video Section</h2>

            <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3  gap-4 md:gap-7 lg:gap-10">
                {videos.map(({ title, url }, idx) => (
                    <div
                        key={idx}
                        className="bg-white/20 backdrop-blur-md border border-brand-300 rounded-2xl shadow-sm hover:shadow-lg hover:scale-[1.03] transition-transform duration-300 overflow-hidden"
                    >
                        <div className=" rounded-t-2xl aspect-[4/3]">
                            <iframe
                                src={url}
                                title={title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            />
                        </div>
                        <div className="px-2 py-4 text-center">
                            <h3 className="text-sm md:text-base text-brand-800 font-semibold tracking-wide">{title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
