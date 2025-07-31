"use client";

import React, { useEffect, useState } from "react";
import { getAllVideoApi, updateVideoApi, deleteVideoApi } from "@/src/api/VideosApi";

const AllVideos = () => {
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
        getAllVideoApi().then((data) => {
            if (data.error) {
                setMessage({ text: data.message, type: "error" });
            } else {
                setVideos(data.data || []);
            }
        });
    };

    const handleEdit = (video) => {
        setEditingId(video._id);
        setEditTitle(video.title);
        setEditIframe(video.url || "");
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditTitle("");
        setEditIframe("");
    };

    const handleUpdate = async (id) => {
        if (!editTitle.trim() || !editIframe.trim()) {
            return setMessage({ text: "Both title and iframe are required", type: "error" });
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("title", editTitle);
        formData.append("url", editIframe);
        formData.append("id", editingId);

        updateVideoApi(id, formData).then((data) => {
            if (data.error) {
                setMessage({ text: data.message, type: "error" });
            } else {
                setMessage({ text: data.message, type: "success" });
                setEditingId(null);
                fetchVideos();
            }
        });
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this video?")) return;

        const res = await deleteVideoApi(id);
        if (res.error) {
            setMessage({ text: res.message, type: "error" });
        } else {
            setMessage({ text: "Video deleted", type: "success" });
            fetchVideos();
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-6">All Videos</h2>

            {videos.length === 0 ? (
                <p>No videos found.</p>
            ) : (
                videos.map((video) => (
                    <div key={video._id} className="mb-8 border-b pb-6">
                        {console.log(video)}
                        {editingId === video._id ? (
                            <>
                                <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Video Title" className="w-full mb-2 px-4 py-2 border rounded" />
                                <textarea value={editIframe} onChange={(e) => setEditIframe(e.target.value)} className="w-full h-32 px-4 py-2 border rounded mb-2" placeholder="<iframe>...</iframe>" />

                                <div className="flex gap-4">
                                    <button onClick={() => handleUpdate(video._id)} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
                                        {loading ? "Updating..." : "Update"}
                                    </button>
                                    <button onClick={handleCancel} className="text-gray-600 hover:underline">
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h4 className="text-lg font-semibold mb-2">{video.title}</h4>
                                <div className="mb-3">
                                    <iframe
                                        width="560"
                                        height="315"
                                        src={video.url}
                                        title={video.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        className="w-full max-w-full"
                                    ></iframe>
                                </div>

                                <div className="flex gap-4">
                                    <button onClick={() => handleEdit(video)} className="text-blue-600 hover:underline">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(video._id)} className="text-red-600 hover:underline">
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))
            )}

            {message && <p className={`mt-4 text-sm ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>{message.text}</p>}
        </div>
    );
};

export default AllVideos;
