"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getProjectByIdApi, updateProjectApi } from "@/src/api/ProjectApi";
import { getAllServiceApi } from "@/src/api/ServiceApi";

export default function UpdateProjectPage() {
    const router = useRouter();
    const params = useParams();
    const projectId = params.id;

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

    // Images state:
    // For existing images, store array of objects { url, _id?, name, contentType }
    // For new images, store File objects separately
    const [featureImageExisting, setFeatureImageExisting] = useState(null); // object or null
    const [featureImageNew, setFeatureImageNew] = useState(null);

    const [clientImageExisting, setClientImageExisting] = useState(null);
    const [clientImageNew, setClientImageNew] = useState(null);

    const [imagesExisting, setImagesExisting] = useState([]); // array of image objects
    const [imagesNew, setImagesNew] = useState([]); // array of File objects

    // Refs for file inputs
    const featureImageRef = useRef();
    const clientImageRef = useRef();
    const imagesRef = useRef();

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [message, setMessage] = useState("");

    // Fetch project & services on mount
    useEffect(() => {
        async function fetchData() {
            setFetching(true);
            try {
                const [servicesRes, projectRes] = await Promise.all([getAllServiceApi(), getProjectByIdApi(projectId)]);

                if (!servicesRes.error) setServices(servicesRes.data);

                if (!projectRes.error) {
                    const p = projectRes.data;

                    setFormData({
                        service: p.service?._id || "",
                        name: p.name || "",
                        description: p.description || "",
                        location: p.location || "",
                        startDate: p.startDate ? p.startDate.split("T")[0] : "",
                        endDate: p.endDate ? p.endDate.split("T")[0] : "",
                        status: p.status || "",
                        clientName: p.clientName || "",
                        clientMobile: p.clientMobile || "",
                        clientEmail: p.clientEmail || "",
                    });

                    setFeatureImageExisting(p.featureImage || null);
                    setClientImageExisting(p.clientImage || null);
                    setImagesExisting(p.images || []);
                } else {
                    setMessage("Project not found");
                }
            } catch (err) {
                setMessage("Failed to fetch data");
            } finally {
                setFetching(false);
            }
        }

        fetchData();
    }, [projectId]);

    const handleInputChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // Single image changes (feature & client)
    const handleSingleImageChange = (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        if (type === "featureImage") {
            setFeatureImageNew(file);
            // Remove old existing since user replaces it
            setFeatureImageExisting(null);
        } else if (type === "clientImage") {
            setClientImageNew(file);
            setClientImageExisting(null);
        }
    };

    // Multiple images change
    const handleMultipleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        setImagesNew((prev) => [...prev, ...files]);
    };

    // Delete existing images handlers:
    const removeFeatureImageExisting = () => setFeatureImageExisting(null);
    const removeClientImageExisting = () => setClientImageExisting(null);

    const removeImageExistingAtIndex = (index) => {
        setImagesExisting((prev) => prev.filter((_, i) => i !== index));
    };

    // Delete new images (not yet uploaded)
    const removeImageNewAtIndex = (index) => {
        setImagesNew((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const dataToSend = new FormData();

            // Append text fields
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    dataToSend.append(key, value);
                }
            });

            // For images, we need to send info about existing images that remain
            // We can send arrays of existing image URLs or IDs that should remain

            // Feature Image:
            if (featureImageNew) {
                // New file uploaded
                dataToSend.append("featureImage", featureImageNew);
            } else if (featureImageExisting) {
                // Send some identifier so backend knows to keep this image
                // For example: URL or _id
                dataToSend.append("existingFeatureImage", JSON.stringify(featureImageExisting));
            }

            // Client Image:
            if (clientImageNew) {
                dataToSend.append("clientImage", clientImageNew);
            } else if (clientImageExisting) {
                dataToSend.append("existingClientImage", JSON.stringify(clientImageExisting));
            }

            // Multiple images:
            // Append new images files
            imagesNew.forEach((file) => {
                dataToSend.append("images", file);
            });

            // Append JSON array of existing images to keep
            dataToSend.append("existingImages", JSON.stringify(imagesExisting));

            // Call update API
            const res = await updateProjectApi(dataToSend, projectId);

            if (res.error) {
                setMessage(res.message || "Something went wrong");
            } else {
                setMessage("✅ Project updated successfully!");
                // router.push("/admin/dashboard/project");
            }
        } catch (err) {
            setMessage("❌ Failed to submit");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return <div className="flex justify-center items-center h-64 text-gray-600 dark:text-gray-400">Loading project data...</div>;
    }

    return (
        <div className="mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Update Project</h2>

            {message && <p className={`mb-6 text-center text-sm ${message.startsWith("✅") ? "text-green-600" : "text-red-600"} font-semibold`}>{message}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service Select */}
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

                {/* Other text inputs */}
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

                {/* Feature Image */}
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

                    {featureImageExisting && (
                        <div className="relative inline-block mt-3">
                            <img src={featureImageExisting.url} alt="Feature Image" className="w-40 h-40 object-cover rounded-lg" />
                            <button
                                type="button"
                                onClick={removeFeatureImageExisting}
                                className="absolute top-1 right-1 bg-red-600 rounded-full p-1 text-white hover:bg-red-700"
                                title="Remove feature image"
                            >
                                &times;
                            </button>
                        </div>
                    )}

                    {featureImageNew && (
                        <div className="inline-block mt-3">
                            <img src={URL.createObjectURL(featureImageNew)} alt="New Feature" className="w-40 h-40 object-cover rounded-lg" />
                        </div>
                    )}
                </div>

                {/* Client Image */}
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

                    {clientImageExisting && (
                        <div className="relative inline-block mt-3">
                            <img src={clientImageExisting.url} alt="Client Image" className="w-40 h-40 object-cover rounded-lg" />
                            <button
                                type="button"
                                onClick={removeClientImageExisting}
                                className="absolute top-1 right-1 bg-red-600 rounded-full p-1 text-white hover:bg-red-700"
                                title="Remove client image"
                            >
                                &times;
                            </button>
                        </div>
                    )}

                    {clientImageNew && (
                        <div className="inline-block mt-3">
                            <img src={URL.createObjectURL(clientImageNew)} alt="New Client" className="w-40 h-40 object-cover rounded-lg" />
                        </div>
                    )}
                </div>

                {/* Multiple Images */}
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

                    {/* Existing images with delete */}
                    <div className="mt-3 flex flex-wrap gap-3">
                        {imagesExisting.map((img, idx) => (
                            <div key={idx} className="relative group">
                                <img src={img.url} alt={`Existing image ${idx + 1}`} className="w-24 h-24 object-cover rounded-lg" />
                                <button
                                    type="button"
                                    onClick={() => removeImageExistingAtIndex(idx)}
                                    className="absolute top-1 right-1 bg-red-600 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 hover:bg-red-700 transition"
                                    title="Remove image"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}

                        {/* New images with delete */}
                        {imagesNew.map((file, idx) => (
                            <div key={"new-" + idx} className="relative group">
                                <img src={URL.createObjectURL(file)} alt={`New image ${idx + 1}`} className="w-24 h-24 object-cover rounded-lg" />
                                <button
                                    type="button"
                                    onClick={() => removeImageNewAtIndex(idx)}
                                    className="absolute top-1 right-1 bg-red-600 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 hover:bg-red-700 transition"
                                    title="Remove new image"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit button */}
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
                    {loading ? "Updating..." : "Update Project"}
                </button>
            </form>
        </div>
    );
}
