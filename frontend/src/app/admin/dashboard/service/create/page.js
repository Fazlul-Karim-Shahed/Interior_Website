"use client";
import { createServiceApi } from "@/src/api/ServiceApi";
import { useState, useRef } from "react";

export default function page() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    const [imagePreview, setImagePreview] = useState(null);
    const imageRef = useRef();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleImageChange = (e, type) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            image: file,
        });
        if (!file) return;

        if (type === "image") {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const data = await createServiceApi(formData);
            if (data.error) {
                setMessage(data.message || "Something went wrong");
            } else {
                setMessage("✅ Service created successfully!");
                setFormData({ name: "", description: "" });
                setImagePreview(null);
                imageRef.current.value = "";
            }
        } catch (err) {
            setMessage("❌ Failed to submit");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto p-6  dark:bg-gray-900 rounded-2xl mt-">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Create New Service</h2>
            {message && <p className="mb-4 text-center text-sm text-red-500">{message}</p>}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">Service Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:text-white"
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">Service Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, "image")}
                        ref={imageRef}
                        className="w-full bg-white border border-gray-300 rounded-xl p-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-brand-500 file:text-white hover:file:bg-brand-600 cursor-pointer"
                    />
                    {imagePreview && <img src={imagePreview} alt="Preview" className="mt-3 w-32 h-32 object-cover rounded-lg" />}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-6 rounded-xl text-white bg-brand-500 hover:bg-brand-600 transition font-semibold flex justify-center items-center gap-2 ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    {loading && (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                    )}
                    {loading ? "Creating..." : "Create Service"}
                </button>
            </form>
        </div>
    );
}
