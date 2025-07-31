"use client";

import React, { useEffect, useState } from "react";
import { getAllProjectsApi } from "@/src/api/ProjectApi";
import Link from "next/link";
import { slugify } from "@/src/functions/CustomFunction";


export default function ShowAllProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const res = await getAllProjectsApi();
            if (!res.error) {
                setProjects(res.data);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    return (
        <div className="bg-gradient-to-br from-white via-gray-50 to-white min-h-screen">
            {/* Header */}
            <div
                className="w-full h-56 md:h-72 bg-cover bg-center relative flex items-center justify-center"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1500&q=80')",
                }}
            >
                <div className="absolute inset-0 bg-white/60 backdrop-blur-md"></div>
                <h1 className="relative text-4xl md:text-5xl font-bold text-gray-800 text-center drop-shadow px-4">Our Completed Projects</h1>
            </div>

            {/* Projects Grid */}
            <div className="px-6 md:px-20 py-16">
                {loading ? (
                    <p className="text-center text-gray-500 text-lg">Loading projects...</p>
                ) : projects.length === 0 ? (
                    <p className="text-center text-red-500 text-lg">No projects found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {projects.map((project) => (
                            <Link
                                href={`/project/${slugify(project.name)}`}
                                key={project._id}
                                className="group relative bg-white/30 backdrop-blur-lg rounded-3xl border border-white/40 overflow-hidden shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                            >
                                {/* Decorative radial glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/10 to-transparent opacity-30 group-hover:opacity-40 transition-all duration-300"></div>

                                {/* Project image */}
                                {project.featureImage?.url && (
                                    <div className="relative w-full pt-[62.5%] overflow-hidden rounded-t-3xl">
                                        <img
                                            src={project.featureImage.url}
                                            alt={project.name}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                )}

                                {/* Card content */}
                                <div className="relative z-10 p-6">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-1">{project.name}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-5 my-7 line-clamp-2 overflow-hidden">
                                        <div dangerouslySetInnerHTML={{ __html: project.description }} />
                                    </p>
                                    <div className="text-xs text-gray-500 space-y-1 pt-2 border-t border-gray-200">
                                        {project.startDate && (
                                            <p>
                                                <strong>Start:</strong> {new Date(project.startDate).toLocaleDateString()}
                                            </p>
                                        )}
                                        {project.endDate && (
                                            <p>
                                                <strong>End:</strong> {new Date(project.endDate).toLocaleDateString()}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Optional glow behind */}
                                <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-white/20 blur-3xl rounded-full pointer-events-none group-hover:scale-110 transition duration-500"></div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
