"use client";

import React, { useEffect, useState } from "react";
import { getSettingsApi, updateSettingsApi } from "@/src/api/settingsApi";
import { getAllProjectsApi } from "@/src/api/ProjectApi";

const ProjectsSelector = () => {
    const [allProjects, setAllProjects] = useState([]);
    const [selectedProjectIds, setSelectedProjectIds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const [projectsRes, settingsRes] = await Promise.all([getAllProjectsApi(), getSettingsApi()]);

        if (!projectsRes.error) setAllProjects(projectsRes.data || []);
        if (!settingsRes.error && settingsRes.data?.projects) {
            const selectedIds = settingsRes.data.projects.map((p) => p._id || p);
            setSelectedProjectIds(selectedIds);
        }
    };

    const toggleSelect = (id) => {
        setSelectedProjectIds((prev) => (prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]));
    };

    const handleSave = async () => {
        if (selectedProjectIds.length === 0) {
            return setMessage({ text: "Please select at least one project", type: "error" });
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("projects", JSON.stringify(selectedProjectIds));

            const res = await updateSettingsApi(formData);
            if (res.error) {
                setMessage({ text: res.message || "Something went wrong", type: "error" });
            } else {
                setMessage({ text: "Projects updated successfully", type: "success" });
            }
        } catch (err) {
            setMessage({ text: err?.message || "Unexpected error", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-3 bg-white rounded-xl">
            <h2 className="text-2xl font-bold mb-6">Select Projects to Show</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProjects.map((project) => (
                    <div key={project._id} className={`border rounded-lg p-4 relative shadow transition ${selectedProjectIds.includes(project._id) ? "border-blue-600" : "border-gray-200"}`}>
                        <input type="checkbox" checked={selectedProjectIds.includes(project._id)} onChange={() => toggleSelect(project._id)} className="absolute top-3 right-3 w-5 h-5" />

                        {project.featureImage?.url && <img src={project.featureImage.url} alt={project.name} className="w-full h-32 object-cover rounded mb-2" />}

                        <h4 className="text-lg font-semibold">{project.name}</h4>
                        <p className="text-sm text-gray-600 line-clamp-3">{project.description || "No description"}</p>
                    </div>
                ))}
            </div>

            <button onClick={handleSave} disabled={loading} className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
                {loading ? "Saving..." : "Save Selected Projects"}
            </button>

            {message && <p className={`mt-4 text-sm ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>{message.text}</p>}
        </div>
    );
};

export default ProjectsSelector;
