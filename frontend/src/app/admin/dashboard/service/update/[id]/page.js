"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getAServiceApi, updateServiceApi } from "@/src/api/ServiceApi";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function UpdateServicePage() {
    const { id } = useParams();
    const router = useRouter();

    const [formData, setFormData] = useState({ name: "", description: "" });
    const [imagePreview, setImagePreview] = useState(null);
    const imageRef = useRef();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (id) {
            getAServiceApi(id).then((res) => {
                if (!res.error) {
                    setFormData({ name: res.data.name, description: res.data.description || "" });
                    setImagePreview(res.data.image?.url || null);
                } else {
                    setMessage(res.message);
                }
            });
        }
    }, [id]);

    const handleInputChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        if (imageRef.current?.files[0]) {
            data.append("image", imageRef.current.files[0]);
        }

        const res = await updateServiceApi(data, id);
        if (res.error) {
            setMessage(res.message);
        } else {
            setMessage("✅ Service updated successfully!");
            // router.push("/service");
        }

        setLoading(false);
    };

    return (
        <div className="p-3 mt-10  dark:bg-gray-900 rounded-xl">
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">Update Service</h2>
            {message && <p className="text-center text-red-500 mb-4">{message}</p>}

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
                    <div className="border border-gray-300 rounded-xl overflow-hidden dark:border-gray-600 dark:bg-gray-800">
                        <JoditEditor
                            value={formData.description}
                            onBlur={(newContent) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    description: newContent,
                                }))
                            }
                            config={{
                                readonly: false,
                                height: 300,
                                toolbarSticky: false,
                            }}
                        />
                    </div>
                </div>

                <div>
                    <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">Service Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={imageRef}
                        className="w-full bg-white border border-gray-300 rounded-xl p-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-brand-500 file:text-white hover:file:bg-brand-600 cursor-pointer"
                    />
                    {imagePreview && <img src={imagePreview} alt="Preview" className="mt-3 w-32 h-32 object-cover rounded-lg" />}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-6 rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition font-semibold ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    {loading ? "Updating..." : "Update Service"}
                </button>
            </form>
        </div>
    );
}
