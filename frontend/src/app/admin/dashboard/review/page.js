"use client";

import React, { useEffect, useState } from "react";
import { getAllReviewsApi, updateReviewApi, deleteReviewApi } from "@/src/api/ReviewApi";

export default function AllReviewsPage() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editReview, setEditReview] = useState(null);
    const [editName, setEditName] = useState("");
    const [editReviewText, setEditReviewText] = useState("");
    const [editDesignation, setEditDesignation] = useState("");
    const [editImage, setEditImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        setLoading(true);
        const res = await getAllReviewsApi();
        if (!res.error) setReviews(res.data);
        setLoading(false);
    };

    const handleEdit = (review) => {
        setEditReview(review);
        setEditName(review.name);
        setEditReviewText(review.review || "");
        setEditDesignation(review.customerDesignation || "");
        setPreview(review.customerImage?.url || null);
        setEditImage(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setEditImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const submitEdit = async () => {
        if (!editName.trim()) {
            alert("Name is required");
            return;
        }
        setUpdating(true);
        const formData = new FormData();
        formData.append("name", editName);
        formData.append("review", editReviewText);
        formData.append("customerDesignation", editDesignation);
        if (editImage) formData.append("customerImage", editImage);

        const res = await updateReviewApi(editReview._id, formData);
        setUpdating(false);

        if (!res.error) {
            setEditReview(null);
            fetchReviews();
        } else {
            alert(res.message);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this review?")) {
            const res = await deleteReviewApi(id);
            if (!res.error) fetchReviews();
            else alert(res.message);
        }
    };

    return (
        <div className=" py-6 px-6">
            <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12 tracking-tight">Customer Reviews</h1>

            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : reviews.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">No reviews found.</p>
            ) : (
                <div className="max-w-7xl mx-auto grid gap-10 grid-cols-1 md:grid-cols-2 ">
                    {reviews.map((review) => (
                        <div key={review._id} className="flex rounded-xl shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
                            {/* Left side: customer photo */}
                            <div className="flex-shrink-0 w-28 h-28 relative m-6 rounded-full border-4 border-purple-600 overflow-hidden shadow-md">
                                {review.customerImage?.url ? (
                                    <img src={review.customerImage.url} alt={review.name} className="w-full h-full object-cover" loading="lazy" />
                                ) : (
                                    <div className="w-full h-full bg-purple-100 flex items-center justify-center text-purple-600 text-4xl font-bold uppercase">{review.name.charAt(0)}</div>
                                )}
                            </div>

                            {/* Right side: review text and details */}
                            <div className="flex flex-col justify-between p-6 pr-10 flex-grow">
                                <div className="flex items-start space-x-4">
                                    {/* Quote icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-purple-200 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M7.17 6A5 5 0 002 11v5a3 3 0 003 3h2a3 3 0 003-3v-5a5 5 0 00-3.83-4zM17.17 6A5 5 0 0012 11v5a3 3 0 003 3h2a3 3 0 003-3v-5a5 5 0 00-3.83-4z" />
                                    </svg>

                                    {/* Review text */}
                                    <blockquote className="text-gray-800 text-lg leading-relaxed">{review.review || "No review provided."}</blockquote>
                                </div>

                                <footer className="mt-6 flex flex-col items-start">
                                    <p className="text-xl font-semibold text-purple-700">{review.name}</p>
                                    <p className="text-sm text-purple-500">{review.customerDesignation || "Customer"}</p>
                                </footer>

                                {/* Actions */}
                                <div className="mt-6 flex space-x-4 self-end">
                                    <button
                                        onClick={() => handleEdit(review)}
                                        aria-label={`Edit review by ${review.name}`}
                                        className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition"
                                        title="Edit"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15.232 5.232l3.536 3.536M16.768 3.768a2.5 2.5 0 113.536 3.536L7 20.536H3v-4.243L16.768 3.768z"
                                            />
                                        </svg>
                                    </button>

                                    <button
                                        onClick={() => handleDelete(review._id)}
                                        aria-label={`Delete review by ${review.name}`}
                                        className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                                        title="Delete"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Edit Modal */}
            {editReview && (
                <div role="dialog" aria-modal="true" className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity duration-300">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 relative animate-fade-in">
                        <h3 className="text-3xl font-bold mb-6 text-center text-purple-700">Edit Review</h3>

                        <label className="block mb-2 font-semibold text-gray-700">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full border border-purple-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            autoFocus
                            required
                        />

                        <label className="block mb-2 font-semibold text-gray-700">Review</label>
                        <textarea
                            rows={5}
                            value={editReviewText}
                            onChange={(e) => setEditReviewText(e.target.value)}
                            className="w-full border border-purple-300 rounded-lg px-4 py-3 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
                            placeholder="Write the review"
                        />

                        <label className="block mb-2 font-semibold text-gray-700">Customer Designation</label>
                        <input
                            type="text"
                            value={editDesignation}
                            onChange={(e) => setEditDesignation(e.target.value)}
                            className="w-full border border-purple-300 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            placeholder="e.g. CEO, Manager"
                        />

                        <label className="block mb-2 font-semibold text-gray-700">Customer Image</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="mb-6" />

                        {preview && <img src={preview} alt="Preview" className="mx-auto w-32 h-32 rounded-full object-cover shadow-md mb-6" />}

                        <div className="flex justify-end space-x-5 mt-4">
                            <button onClick={() => setEditReview(null)} className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 font-semibold transition">
                                Cancel
                            </button>

                            <button
                                onClick={submitEdit}
                                disabled={updating}
                                className={`px-6 py-3 rounded-xl font-semibold text-white transition ${updating ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
                            >
                                {updating ? (
                                    <svg className="inline animate-spin mr-2 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                    </svg>
                                ) : null}
                                {updating ? "Updating..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 0.25s ease forwards;
                }
            `}</style>
        </div>
    );
}
