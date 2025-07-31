"use client";

import React, { useState } from "react";
import { createReviewApi } from "@/src/api/ReviewApi";
import { useRouter } from "next/navigation";

export default function CreateReviewPage() {
    const [name, setName] = useState("");
    const [review, setReview] = useState("");
    const [customerDesignation, setCustomerDesignation] = useState("");
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

        if (!name) {
            alert("Name is required");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("review", review);
        formData.append("customerDesignation", customerDesignation);
        if (imageFile) formData.append("customerImage", imageFile);

        const res = await createReviewApi(formData);

        setLoading(false);

        if (res.error) {
            alert(res.message);
        } else {
            alert("Review created successfully!");
            router.push("/dashboard/review"); // Redirect to review list page
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">Create New Review</h1>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block mb-1 font-medium">Name *</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Customer name"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Review</label>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        rows={4}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Write the review here..."
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Customer Designation</label>
                    <input
                        type="text"
                        value={customerDesignation}
                        onChange={(e) => setCustomerDesignation(e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Customer designation (e.g. CEO)"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Customer Image</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
                    {preview && <img src={preview} alt="Preview" className="mt-3 h-32 object-contain rounded border mx-auto" />}
                </div>

                <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition disabled:opacity-50">
                    {loading ? "Creating..." : "Create Review"}
                </button>
            </form>
        </div>
    );
}
