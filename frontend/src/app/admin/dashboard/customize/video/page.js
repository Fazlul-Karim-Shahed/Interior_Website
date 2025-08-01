"use client";

import React, { useEffect, useState } from "react";
import { getAllVideoApi } from "@/src/api/VideosApi";
import { getSettingsApi, updateSettingsApi } from "@/src/api/settingsApi";

const VideosSelector = () => {
    const [videos, setVideos] = useState([]);
    const [selectedVideoIds, setSelectedVideoIds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const [videosRes, settingsRes] = await Promise.all([getAllVideoApi(), getSettingsApi()]);

        if (!videosRes.error) setVideos(videosRes.data || []);
        if (!settingsRes.error && settingsRes.data?.videos) {
            setSelectedVideoIds(settingsRes.data.videos.map((v) => v._id || v));
        }
    };

    const toggleSelect = (id) => {
        setSelectedVideoIds((prev) => (prev.includes(id) ? prev.filter((vid) => vid !== id) : [...prev, id]));
    };

    const handleSave = async () => {
        if (selectedVideoIds.length === 0) {
            return setMessage({ text: "Please select at least one video", type: "error" });
        }

        const formData = new FormData();
        formData.append("videos", JSON.stringify(selectedVideoIds)); // ✅ Save selected video IDs

        setLoading(true);
        try {
            const res = await updateSettingsApi(formData);
            if (res.error) {
                setMessage({ text: res.message || "Something went wrong", type: "error" });
            } else {
                setMessage({ text: "Videos updated successfully", type: "success" });
            }
        } catch (err) {
            setMessage({ text: err?.message || "Unexpected error", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-3 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">Select Videos to Show on Website</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                    <div key={video._id} className={`border rounded-lg p-4 relative shadow transition ${selectedVideoIds.includes(video._id) ? "border-blue-600" : "border-gray-200"}`}>
                        <input type="checkbox" checked={selectedVideoIds.includes(video._id)} onChange={() => toggleSelect(video._id)} className="absolute top-3 right-3 w-5 h-5" />

                        <div className="w-full aspect-video mb-2">
                            <iframe
                                src={video.url}
                                title={video.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="w-full h-full rounded"
                            ></iframe>
                        </div>

                        <h4 className="text-lg font-semibold">{video.title}</h4>
                    </div>
                ))}
            </div>

            <button onClick={handleSave} disabled={loading} className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
                {loading ? "Saving..." : "Save Selected Videos"}
            </button>

            {message && <p className={`mt-4 text-sm ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>{message.text}</p>}
        </div>
    );
};

export default VideosSelector;
