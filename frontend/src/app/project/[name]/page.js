"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProjectByNameApi } from "@/src/api/ProjectApi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faUser, faWrench } from "@fortawesome/free-solid-svg-icons";

export default function ProjectDetailsPage() {
    const { name } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProject() {
            try {
                const res = await getProjectByNameApi(name);
                if (res.error) {
                    setError(res.message || "Project not found");
                    setProject(null);
                } else {
                    setProject(res.data);
                    setError(null);
                }
            } catch (err) {
                setError("Failed to fetch project data");
                setProject(null);
            }
            setLoading(false);
        }
        fetchProject();
    }, [name]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">Loading project details...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">{error}</div>;
    }

    if (!project) return null;

    return (
        <main className="bg-white min-h-screen">
            {/* Header Section with Title & Image Side-by-Side */}
            {/* Project Title + Image Section */}
            <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">{project.name}</h1>
                    <p className="text-gray-600 text-base sm:text-lg">Discover the journey, timeline, and service details of this project.</p>
                </div>

                {project.featureImage?.url && (
                    <div className="group aspect-[4/3] rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-[1.02]">
                        <img src={project.featureImage.url} alt={project.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                )}
            </div>

            {/* Description Section */}
            <section className="max-w-7xl mx-auto px-4 pb-10 ">
                <div className="bg-gradient-to-br from-white via-slate-50 to-slate-100 backdrop-blur-sm border border-white/30 rounded-2xl shadow p-6 md:p-10 transition-all duration-300 hover:shadow-xl">
                    <div className="text-gray-700 leading-relaxed text-sm sm:text-base space-y-4" dangerouslySetInnerHTML={{ __html: project.description }} />
                </div>
            </section>

            {/* Info Cards with Color Variants */}
            <section className="max-w-7xl mx-auto px-4 py-10">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-7 lg:gap-10">
                    {/* Start Date */}
                    {project.startDate && (
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white py-8 px-4 md:px-6 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105 group">
                            <div className="mb-5 flex justify-center">
                                <div className="bg-white/20 p-4 rounded-full">
                                    <FontAwesomeIcon icon={faCalendarDays} className="text-white text-2xl" />
                                </div>
                            </div>
                            <h3 className="text-center text-lg font-semibold mb-1">Start Date</h3>
                            <p className="text-center text-sm text-white/90">{new Date(project.startDate).toLocaleDateString()}</p>
                        </div>
                    )}

                    {/* End Date */}
                    {project.endDate && (
                        <div className="bg-gradient-to-br from-pink-500 to-red-500 text-white py-8 px-4 md:px-6 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105 group">
                            <div className="mb-5 flex justify-center">
                                <div className="bg-white/20 p-4 rounded-full">
                                    <FontAwesomeIcon icon={faCalendarDays} className="text-white text-2xl" />
                                </div>
                            </div>
                            <h3 className="text-center text-lg font-semibold mb-1">End Date</h3>
                            <p className="text-center text-sm text-white/90">{new Date(project.endDate).toLocaleDateString()}</p>
                        </div>
                    )}

                    {/* Client */}
                    {project.clientName && (
                        <div className="bg-gradient-to-br from-green-500 to-teal-500 text-white py-8 px-4 md:px-6 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105 group">
                            <div className="mb-5 flex justify-center">
                                <div className="bg-white/20 p-4 rounded-full">
                                    <FontAwesomeIcon icon={faUser} className="text-white text-2xl" />
                                </div>
                            </div>
                            <h3 className="text-center text-lg font-semibold mb-1">Client</h3>
                            <p className="text-center text-sm text-white/90">{project.clientName}</p>
                            {/* <p className="text-center text-sm text-white/90">{project.clientMobile}</p>  */}
                        </div>
                    )}

                    {/* Service */}
                    {project.service?.name && (
                        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white py-8 px-4 md:px-6 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105 group">
                            <div className="mb-5 flex justify-center">
                                <div className="bg-white/20 p-4 rounded-full">
                                    <FontAwesomeIcon icon={faWrench} className="text-white text-2xl" />
                                </div>
                            </div>
                            <h3 className="text-center text-lg font-semibold mb-1">Service</h3>
                            <p className="text-center text-sm text-white/90">{project.service.name}</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Gallery */}
            {project.images && project.images.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 pb-16">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Gallery</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {project.images.map((img, idx) => (
                            <div key={idx} className="aspect-[4/3] overflow-hidden rounded-lg shadow">
                                <img src={img.url} alt={`${project.name} image ${idx + 1}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}
