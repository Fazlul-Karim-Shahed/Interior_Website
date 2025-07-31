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
            router.push("/dashboard/client"); // Redirect to client list
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
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

                <div>
                    <label className="block mb-1 font-medium">Client Image</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
                    {preview && <img src={preview} alt="Preview" className="mt-3 h-32 object-contain rounded border" />}
                </div>

                <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition disabled:opacity-50">
                    {loading ? "Creating..." : "Create Client"}
                </button>
            </form>
        </div>
    );
}
