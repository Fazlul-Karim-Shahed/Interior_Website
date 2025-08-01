"use client";

import { createVideoApi } from "@/src/api/VideosApi";
import React, { useState } from "react";

const CreateVideo = () => {
    const [title, setTitle] = useState("");
    const [iframeHtml, setIframeHtml] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    // Extracts src from iframe and removes query parameters
    const extractSrcFromIframe = (html) => {
        const match = html.match(/src="([^"]+)"/);
        if (!match) return null;

        try {
            const url = new URL(match[1]);
            return url.origin + url.pathname; // Remove query string
        } catch (err) {
            return null;
        }
    };

    const handleSubmit = async () => {
        if (!title.trim() || !iframeHtml.trim()) {
            return setMessage({ text: "Title and iframe code are required", type: "error" });
        }

        const extractedUrl = extractSrcFromIframe(iframeHtml);

        if (!extractedUrl) {
            return setMessage({ text: "Invalid iframe. Make sure it contains a valid src.", type: "error" });
        }

        const payload = {
            title,
            url: extractedUrl,
        };

        setLoading(true);
        const res = await createVideoApi(payload);
        setLoading(false);

        if (res.error) {
            setMessage({ text: res.message, type: "error" });
        } else {
            setMessage({ text: "Video added successfully", type: "success" });
            setTitle("");
            setIframeHtml("");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 rounded-xl shadow mt-10">
            <h2 className="text-2xl font-bold mb-6">Add Embedded YouTube Video</h2>

            <div className="mb-4">
                <label className="block font-semibold mb-1">Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2" placeholder="Enter video title" />
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-1">Paste Full iframe Code</label>
                <textarea
                    value={iframeHtml}
                    onChange={(e) => setIframeHtml(e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2 h-32"
                    placeholder='<iframe width="560" height="315" src="..." ...></iframe>'
                />
            </div>

            {/* Live Preview */}
            {iframeHtml && (
                <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Preview:</p>
                    <div dangerouslySetInnerHTML={{ __html: iframeHtml }} />
                </div>
            )}

            <button onClick={handleSubmit} disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
                {loading ? "Saving..." : "Add Video"}
            </button>

            {message && <p className={`mt-4 text-sm ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>{message.text}</p>}
        </div>
    );
};

export default CreateVideo;
