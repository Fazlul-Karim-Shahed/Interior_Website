"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAllProjectsApi, getProjectByNameApi } from "@/src/api/ProjectApi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faUser, faWrench } from "@fortawesome/free-solid-svg-icons";
import { getServiceByNameApi } from "@/src/api/ServiceApi";
import Loading from "@/src/components/client/Loading/Loading";

export default function ServicePage() {
    const { name } = useParams();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [service, setService] = useState(null);

    useEffect(() => {
        async function fetchProjects(name) {
            try {
                getAllProjectsApi().then((data) => {
                    if (data.error) {
                        setError(data.message || "Project not found");
                        setProjects([]);
                    } else {
                        setProjects(data.data.filter((project) => project.service.name === name));
                        setError(null);
                    }
                });
            } catch (err) {
                setError("Failed to fetch project data");
                setProjects(null);
            }
        }

        async function fetchServive() {
            getServiceByNameApi(name).then((data) => {
                if (!data.error) {
                    setService(data.data);
                    fetchProjects(data.data.name);
                }

                setLoading(false);
            });
        }

        fetchServive();
    }, [name]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">{error}</div>;
    }

    if (!service || projects.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center px-2">
                <div className="max-w-md text-center">
                    {/* Animated SVG Icon */}
                    <div className="w-28 h-28 mx-auto mb-6 text-red-500 animate-pulse">
                        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                            <line x1="16" y1="16" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <line x1="9" y1="9" x2="13" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <line x1="13" y1="9" x2="9" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>

                    {/* Message */}
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Nothing to display</h2>
                    <p className="text-gray-600 text-base mb-4">
                        {service === null ? "The service you're looking for doesn't exist or failed to load." : "No projects are currently available for this service."}
                    </p>
                    <a href="/services" className="inline-block bg-blue-600 text-white font-medium px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition">
                        Back to Services
                    </a>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen ">
            {/* Header Section with Title & Image Side-by-Side */}
            {/* Project Title + Image Section */}
            {console.log(projects)}
            {service && (
                <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">{service.name}</h1>
                        <p className="text-gray-600 text-base sm:text-lg">Discover the journey, timeline, and service details of this project.</p>
                    </div>

                    {service.image?.url && (
                        <div className=" mx-auto group aspect-[4/3] rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-[1.02]">
                            <img src={service.image.url} alt={""} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                    )}
                </div>
            )}

            {/* Show projects */}

            <section className="max-w-7xl mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Featured Projects</h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <div key={project._id} className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img
                                    src={project.featureImage?.url || "/placeholder.jpg"}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 "></div>
                            </div>
                            <div className="p-5 space-y-5">
                                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300">{project.name}</h3>

                                <div className="flex items-center justify-between text-sm text-gray-500 pt-2">
                                    <div className="flex items-center gap-2">
                                        <FontAwesomeIcon icon={faUser} className="text-primary" />
                                        <span>{project.clientName || "Client"}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FontAwesomeIcon icon={faCalendarDays} className="text-primary" />
                                        <span>{new Date(project.startDate).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
