"use client";

import React, { useState } from "react";
import { createClientApi } from "@/src/api/ClientApi";
import { useRouter } from "next/navigation";

export default function CreateClientPage() {
    const [name, setName] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) return alert("Client name is required");

        const formData = new FormData();
        formData.append("name", name);
        if (imageFile) {
            formData.append("image", imageFile);
        }

        setLoading(true);
        const res = await createClientApi(formData);
        setLoading(false);

        if (res.error) {
            alert(res.message);
        } else {
            alert("Client created successfully!");
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Create New Client</h1>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block mb-1 font-medium">Client Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter client name"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-2 font-semibold text-gray-700">Client Image</label>
                    <div className="flex items-center space-x-4">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="block w-full text-sm text-gray-600
                 file:mr-4 file:py-2 file:px-4
                 file:rounded-md file:border-0
                 file:text-sm file:font-semibold
                 file:bg-purple-100 file:text-purple-700
                 hover:file:bg-purple-200
                 cursor-pointer"
                        />
                    </div>
                    {preview && <img src={preview} alt="Preview" className="mt-4 mx-auto h-32 w-32 rounded-lg object-cover border border-gray-300 shadow-sm" />}
                </div>

                <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition disabled:opacity-50">
                    {loading ? "Creating..." : "Create Client"}
                </button>
            </form>
        </div>
    );
}
