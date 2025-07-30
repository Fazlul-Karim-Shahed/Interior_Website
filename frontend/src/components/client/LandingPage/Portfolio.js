import React from "react";
import ClientImageWithLoader from "../../Common/ClientImageWithLoader";

const projects = [
    {
        src: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80",
        alt: "Modern Living Room",
        name: "Modern Living Room",
    },
    {
        src: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=800&q=80",
        alt: "Luxury Interior with Lighting",
        name: "Luxury Interior",
    },
    {
        src: "https://plus.unsplash.com/premium_photo-1676968002945-c8f74e0e27d8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI3fHx8ZW58MHx8fHx8",
        alt: "Contemporary Dining Space",
        name: "Contemporary Dining",
    },
];

export default function Portfolio() {
    return (
        <section className="py-24 px-6 bg-gradient-to-br from-brand-50 to-white text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 tracking-wide">Our Portfolio</h2>
            <div className="max-w-7xl mx-auto grid gap-10 grid-cols-2 md:grid-cols-3">
                {projects.map((project, i) => (
                    <div key={i} className="group cursor-pointer shadow-lg rounded-3xl bg-white overflow-hidden transition-shadow duration-300 hover:shadow-2xl">
                        <div className="relative w-full aspect-[4/3] rounded-3xl">
                            <ClientImageWithLoader src={project.src} alt={project.alt} fill className="object-cover object-center transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0  transition-opacity duration-300 pointer-events-none rounded-3xl"></div>
                        </div>
                        <div className="py-4 px-5">
                            <h3 className="text-sm md:text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">{project.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
