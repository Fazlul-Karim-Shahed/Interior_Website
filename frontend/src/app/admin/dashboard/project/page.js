"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllProjectsApi, deleteProjectApi } from "@/src/api/ProjectApi";

export default function ProjectPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        const res = await getAllProjectsApi();
        if (!res.error) setProjects(res.data);
        setLoading(false);
    };

    const handleDelete = async (id) => {
        const confirmed = confirm("Are you sure you want to delete this project?");
        if (!confirmed) return;

        setDeletingId(id);
        setErrorMsg("");

        const res = await deleteProjectApi(id);
        if (res.error) {
            setErrorMsg(res.message || "Failed to delete project.");
        } else {
            setProjects((prev) => prev.filter((p) => p._id !== id));
        }
        setDeletingId(null);
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="text-center text-xl mb-5">All Projects</div>

            {errorMsg && <p className="mb-4 text-center text-red-600 font-semibold">{errorMsg}</p>}

            {loading ? (
                <p className="text-center text-gray-500 dark:text-gray-400">Loading projects...</p>
            ) : projects.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">No projects found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project._id}
                            className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl
                hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
                        >
                            {project.featureImage?.url ? (
                                <img src={project.featureImage.url} alt={project.name} className="w-full h-52 object-cover rounded-t-xl" loading="lazy" />
                            ) : (
                                <div className="w-full h-52 bg-gray-200 dark:bg-gray-700 rounded-t-xl flex items-center justify-center text-gray-400">No Image</div>
                            )}

                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 truncate">{project.name}</h2>

                                <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 mb-3">{project.description || "No description"}</p>

                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                    <strong>Location:</strong> {project.location}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                    <strong>Status:</strong> {project.status}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                    <strong>Client:</strong> {project.clientName} ({project.clientMobile})
                                </p>

                                <div className="flex justify-between items-center">
                                    <Link href={`/admin/dashboard/project/update/${project._id}`}>
                                        <button
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md
                      transition transform active:scale-95"
                                        >
                                            Update
                                        </button>
                                    </Link>

                                    <button
                                        disabled={deletingId === project._id}
                                        onClick={() => handleDelete(project._id)}
                                        className={`px-4 py-2 rounded-lg text-white shadow-md transition
                      ${deletingId === project._id ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}
                      active:scale-95`}
                                    >
                                        {deletingId === project._id ? "Deleting..." : "Delete"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
