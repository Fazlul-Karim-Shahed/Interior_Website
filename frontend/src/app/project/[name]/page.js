"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProjectByNameApi } from "@/src/api/ProjectApi";

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

    if (!project) {
        return null;
    }

    return (
        <main className="max-w-5xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-extrabold mb-6 text-gray-900">{project.name}</h1>

            {project.featureImage?.url && <img src={project.featureImage.url} alt={project.name} className="w-full max-h-96 object-cover rounded-2xl mb-8 shadow-lg" />}

            <section className="mb-8">
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    <div dangerouslySetInnerHTML={{ __html: project.description }} />
                </p>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
                {project.startDate && (
                    <div>
                        <h3 className="font-semibold text-gray-800">Start Date</h3>
                        <p>{new Date(project.startDate).toLocaleDateString()}</p>
                    </div>
                )}
                {project.endDate && (
                    <div>
                        <h3 className="font-semibold text-gray-800">End Date</h3>
                        <p>{new Date(project.endDate).toLocaleDateString()}</p>
                    </div>
                )}
                {project.clientName && (
                    <div>
                        <h3 className="font-semibold text-gray-800">Client</h3>
                        <p>{project.clientName}</p>
                    </div>
                )}
                {project.service && (
                    <div>
                        <h3 className="font-semibold text-gray-800">Service ID</h3>
                        <p>{project.service.name}</p>
                    </div>
                )}
            </section>

            {/* Show additional images if any */}
            {project.images && project.images.length > 0 && (
                <section className="mt-12">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Gallery</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {project.images.map((img, idx) => (
                            <img key={idx} src={img.url} alt={`${project.name} image ${idx + 1}`} className="w-full h-40 object-cover rounded-lg shadow-md" />
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}
