"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createProjectApi } from "@/src/api/ProjectApi";
import { getAllServiceApi } from "@/src/api/ServiceApi";

export default function CreateProjectPage() {
    const router = useRouter();

    const [services, setServices] = useState([]);

    const [formData, setFormData] = useState({
        service: "",
        name: "",
        description: "",
        location: "",
        startDate: "",
        endDate: "",
        status: "",
        clientName: "",
        clientMobile: "",
        clientEmail: "",
    });

    const [featureImagePreview, setFeatureImagePreview] = useState(null);
    const [clientImagePreview, setClientImagePreview] = useState(null);
    const [imagesPreview, setImagesPreview] = useState([]);

    const featureImageRef = useRef();
    const clientImageRef = useRef();
    const imagesRef = useRef();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        getAllServiceApi()
            .then((res) => {
                if (!res.error) {
                    setServices(res.data);
                }
            })
            .catch(() => setServices([]));
    }, []);

    const handleInputChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSingleImageChange = (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        if (type === "featureImage") {
            setFeatureImagePreview(URL.createObjectURL(file));
            setFormData((prev) => ({ ...prev, featureImage: file }));
        } else if (type === "clientImage") {
            setClientImagePreview(URL.createObjectURL(file));
            setFormData((prev) => ({ ...prev, clientImage: file }));
        }
    };

    const handleMultipleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        setImagesPreview(files.map((file) => URL.createObjectURL(file)));
        setFormData((prev) => ({ ...prev, images: files }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const dataToSend = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                if (!value) return;

                if (key === "images") return; // skip here, handled below

                dataToSend.append(key, value);
            });

            if (formData.featureImage) dataToSend.append("featureImage", formData.featureImage);
            if (formData.clientImage) dataToSend.append("clientImage", formData.clientImage);
            if (formData.images && formData.images.length) {
                formData.images.forEach((file) => dataToSend.append("images", file));
            }

            const res = await createProjectApi(dataToSend);

            if (res.error) {
                setMessage(res.message || "Something went wrong");
            } else {
                setMessage("✅ Project created successfully!");
                router.push("/admin/dashboard/project");
            }
        } catch {
            setMessage("❌ Failed to submit");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl mt-10">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Create New Project</h2>

            {message && <p className={`mb-6 text-center text-sm ${message.startsWith("✅") ? "text-green-600" : "text-red-600"} font-semibold`}>{message}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Select Service */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Select Service</label>
                    <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:text-white"
                    >
                        <option value="">-- Select Service --</option>
                        {services.map((service) => (
                            <option key={service._id} value={service._id}>
                                {service.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Project Name */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Project Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:text-white"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:text-white"
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:text-white"
                    />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:text-white"
                        />
                    </div>
                </div>

                {/* Status */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Status</label>
                    <input
                        type="text"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. ongoing, completed"
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:text-white"
                    />
                </div>

                {/* Client Info */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Client Name</label>
                    <input
                        type="text"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Client Mobile</label>
                    <input
                        type="text"
                        name="clientMobile"
                        value={formData.clientMobile}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Client Email</label>
                    <input
                        type="email"
                        name="clientEmail"
                        value={formData.clientEmail}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:text-white"
                    />
                </div>

                {/* Images */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Feature Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleSingleImageChange(e, "featureImage")}
                        ref={featureImageRef}
                        className="w-full bg-white border border-gray-300 rounded-xl p-2
              file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm
              file:bg-brand-500 file:text-white hover:file:bg-brand-600 cursor-pointer"
                    />
                    {featureImagePreview && <img src={featureImagePreview} alt="Feature Preview" className="mt-3 w-40 h-40 object-cover rounded-lg" />}
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Client Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleSingleImageChange(e, "clientImage")}
                        ref={clientImageRef}
                        className="w-full bg-white border border-gray-300 rounded-xl p-2
              file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm
              file:bg-brand-500 file:text-white hover:file:bg-brand-600 cursor-pointer"
                    />
                    {clientImagePreview && <img src={clientImagePreview} alt="Client Preview" className="mt-3 w-40 h-40 object-cover rounded-lg" />}
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">Project Images (Multiple)</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleMultipleImagesChange}
                        ref={imagesRef}
                        className="w-full bg-white border border-gray-300 rounded-xl p-2
              file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm
              file:bg-brand-500 file:text-white hover:file:bg-brand-600 cursor-pointer"
                    />
                    <div className="mt-3 flex flex-wrap gap-3">
                        {imagesPreview.map((src, i) => (
                            <img key={i} src={src} alt={`Preview ${i}`} className="w-24 h-24 object-cover rounded-lg" />
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-6 rounded-xl text-white bg-brand-500 hover:bg-brand-600
            transition font-semibold flex justify-center items-center gap-2
            ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    {loading && (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                    )}
                    {loading ? "Creating..." : "Create Project"}
                </button>
            </form>
        </div>
    );
}
