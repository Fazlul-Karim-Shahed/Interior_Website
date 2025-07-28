"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllServiceApi, deleteServiceApi } from "@/src/api/ServiceApi";

export default function ServicePage() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    const fetchServices = () => {
        setLoading(true);
        getAllServiceApi()
            .then((res) => {
                if (!res.error) {
                    setServices(res.data);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleDelete = async (id) => {
        const confirmed = confirm("Are you sure you want to delete this service?");
        if (!confirmed) return;

        setDeletingId(id);
        setErrorMsg("");

        const res = await deleteServiceApi(id);
        if (res.error) {
            setErrorMsg(res.message || "Failed to delete service.");
        } else {
            setServices((prev) => prev.filter((service) => service._id !== id));
        }
        setDeletingId(null);
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-5">
            <div className="flex justify-center items-center mb-8">
                <h4 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-wide">Services</h4>
            </div>

            {errorMsg && <p className="mb-4 text-center text-red-600 font-semibold">{errorMsg}</p>}

            {loading ? (
                <p className="text-center text-gray-500 dark:text-gray-400">Loading services...</p>
            ) : services.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">No services found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div
                            key={service._id}
                            className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl
                hover:shadow-2xl transition-shadow duration-500 transform hover:-translate-y-1"
                        >
                            {service.image?.url ? (
                                <img src={service.image.url} alt={service.name} className="w-full h-52 object-cover rounded-t-xl" loading="lazy" />
                            ) : (
                                <div className="w-full h-52 bg-gray-200 dark:bg-gray-700 rounded-t-xl flex items-center justify-center text-gray-400">No Image</div>
                            )}

                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 truncate">{service.name}</h2>
                                {service.description && <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">{service.description}</p>}

                                <div className="mt-6 flex justify-between items-center">
                                    <Link href={`/admin/dashboard/service/update/${service._id}`}>
                                        <button
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md
                      transition transform active:scale-95"
                                        >
                                            Update
                                        </button>
                                    </Link>

                                    <button
                                        disabled={deletingId === service._id}
                                        onClick={() => handleDelete(service._id)}
                                        className={`px-4 py-2 rounded-lg text-white shadow-md transition
                      ${deletingId === service._id ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}
                      active:scale-95`}
                                    >
                                        {deletingId === service._id ? "Deleting..." : "Delete"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
