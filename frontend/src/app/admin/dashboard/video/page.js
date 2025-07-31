"use client";

import React, { useEffect, useState } from "react";
import { getAllVideoApi, updateVideoApi, deleteVideoApi } from "@/src/api/VideosApi";

export default function AllVideos() {
    const [videos, setVideos] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editIframe, setEditIframe] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        const res = await getAllVideoApi();
        if (res.error) setMessage({ text: res.message, type: "error" });
        else setVideos(res.data || []);
    };

    const handleEdit = (video) => {
        setEditingId(video._id);
        setEditTitle(video.title);
        setEditIframe(video.url);
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditTitle("");
        setEditIframe("");
    };

    const handleUpdate = async () => {
        if (!editTitle.trim() || !editIframe.trim()) {
            return setMessage({ text: "Both title and iframe are required", type: "error" });
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("title", editTitle);
        formData.append("url", editIframe);
        formData.append("id", editingId);

        const res = await updateVideoApi(editingId, formData);
        setLoading(false);
        if (res.error) setMessage({ text: res.message, type: "error" });
        else {
            setMessage({ text: res.message, type: "success" });
            setEditingId(null);
            fetchVideos();
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this video?")) return;
        const res = await deleteVideoApi(id);
        if (res.error) setMessage({ text: res.message, type: "error" });
        else {
            setMessage({ text: "Video deleted", type: "success" });
            fetchVideos();
        }
    };

    return (
        <div className="py-6">
            <h1 className="text-3xl font-bold mb-16 text-">🎞️ Your Video Library</h1>

            <div className="space-y-14">
                {videos.map((video) => (
                    <div key={video._id} className="border-b pb-10">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-[45%]">
                                <div className="aspect-video overflow-hidden rounded-xl shadow">
                                    <iframe
                                        src={video.url}
                                        title={video.title}
                                        className="w-full h-full"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">{video.title}</h2>
                                    <p className="text-sm text-gray-500">
                                        Video ID: <span className="font-mono">{video._id.slice(0, 6)}...</span>
                                    </p>
                                </div>
                                <div className="mt-4 flex gap-4">
                                    <button onClick={() => handleEdit(video)} className="text-blue-600 font-medium hover:text-blue-800 transition">
                                        ✏️ Edit
                                    </button>
                                    <button onClick={() => handleDelete(video._id)} className="text-red-600 font-medium hover:text-red-800 transition">
                                        🗑️ Delete
                                    </button>
                                </div>
                            </div>
                        </div>

                        {editingId === video._id && (
                            <div className="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
                                <h3 className="text-lg font-medium mb-4 text-gray-700">Edit Video</h3>

                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    placeholder="Video Title"
                                    className="w-full mb-4 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />

                                <textarea
                                    value={editIframe}
                                    onChange={(e) => setEditIframe(e.target.value)}
                                    className="w-full h-28 px-4 py-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    placeholder="<iframe>...</iframe>"
                                />

                                <div className="flex justify-between mt-4">
                                    <button onClick={handleUpdate} disabled={loading} className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition disabled:opacity-50">
                                        {loading ? "Saving..." : "Update"}
                                    </button>
                                    <button onClick={handleCancel} className="text-gray-600 hover:text-black">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {message && <p className={`mt-12 text-center text-sm ${message.type === "error" ? "text-red-600" : "text-emerald-600"}`}>{message.text}</p>}
        </div>
    );
}
