"use client";

import React, { useEffect, useState } from "react";
import { getSettingsApi, updateSettingsApi } from "@/src/api/settingsApi";

const SliderSettings = () => {
    const [existingImages, setExistingImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    // Load existing settings on mount
    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        const res = await getSettingsApi();
        if (!res.error && res.data?.sliderImages) {
            setExistingImages(res.data.sliderImages);
        } else {
            setMessage({ text: res.message || "Failed to fetch settings", type: "error" });
        }
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setNewImages(files);
        setPreviewUrls(files.map((file) => URL.createObjectURL(file)));
    };

    const handleDeleteExisting = (index) => {
        const updated = [...existingImages];
        updated.splice(index, 1);
        setExistingImages(updated);
    };

    const handleDeleteNew = (index) => {
        const updated = [...newImages];
        const updatedPreviews = [...previewUrls];
        updated.splice(index, 1);
        updatedPreviews.splice(index, 1);
        setNewImages(updated);
        setPreviewUrls(updatedPreviews);
    };

    const handleSubmit = async () => {
        if (existingImages.length === 0 && newImages.length === 0) {
            return setMessage({ text: "Please add at least one image", type: "error" });
        }

        const formData = new FormData();

        newImages.forEach((file) => {
            formData.append("sliderImages", file);
        });

        existingImages.forEach((img) => {
            formData.append("existingSliderImages", JSON.stringify(img));
        });

        setLoading(true);
        try {
            const res = await updateSettingsApi(formData);
            if (res.error) {
                setMessage({ text: res.message || "Something went wrong", type: "error" });
            } else {
                setMessage({ text: res.message || "Updated successfully", type: "success" });
                setNewImages([]);
                setPreviewUrls([]);
                loadSettings(); // reload
            }
        } catch (err) {
            setMessage({
                text: err?.response?.data?.message || "Something went wrong",
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" bg-white rounded-xl p-3">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Slider Images</h2>

            {/* Existing Images */}
            {existingImages.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Existing Images</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {existingImages.map((img, idx) => (
                            <div key={idx} className="relative group">
                                <img src={img.url} alt={`slider-${idx}`} className="w-full h-40 object-cover rounded-lg border  aspect-[4/3]" />
                                <button
                                    onClick={() => handleDeleteExisting(idx)}
                                    className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Upload Input */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Add New Images</label>
                <input type="file" multiple accept="image/*" onChange={handleFileChange} className="border rounded px-3 py-2 w-full" />
            </div>

            {/* Previews */}
            {previewUrls.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">New Image Previews</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {previewUrls.map((url, idx) => (
                            <div key={idx} className="relative group">
                                <img src={url} alt={`preview-${idx}`} className="w-full h-40 object-cover rounded-lg border" />
                                <button
                                    onClick={() => handleDeleteNew(idx)}
                                    className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Submit Button */}
            <button onClick={handleSubmit} disabled={loading} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                {loading ? "Saving..." : "Save Slider"}
            </button>

            {/* Message */}
            {message && <p className={`mt-4 text-sm ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>{message.text}</p>}
        </div>
    );
};

export default SliderSettings;
