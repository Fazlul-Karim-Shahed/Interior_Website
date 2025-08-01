"use client";

import React, { useEffect, useState } from "react";
import { getSettingsApi, updateSettingsApi } from "@/src/api/settingsApi";
import { getAllServiceApi } from "@/src/api/ServiceApi";

const ServicesSelector = () => {
    const [allServices, setAllServices] = useState([]);
    const [selectedServiceIds, setSelectedServiceIds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const [servicesRes, settingsRes] = await Promise.all([getAllServiceApi(), getSettingsApi()]);

        if (!servicesRes.error) setAllServices(servicesRes.data || []);
        if (!settingsRes.error && settingsRes.data?.services) {
            setSelectedServiceIds(settingsRes.data.services.map((s) => s._id || s));
        }
    };

    const toggleSelect = (id) => {
        setSelectedServiceIds((prev) => (prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]));
    };

    const handleSave = async () => {
        if (selectedServiceIds.length === 0) {
            return setMessage({ text: "Please select at least one service", type: "error" });
        }

        const formData = new FormData();
        formData.append("services", JSON.stringify(selectedServiceIds)); // ✅ Send as JSON string

        setLoading(true);
        try {
            const res = await updateSettingsApi(formData);
            if (res.error) {
                setMessage({ text: res.message || "Something went wrong", type: "error" });
            } else {
                setMessage({ text: "Services updated successfully", type: "success" });
            }
        } catch (err) {
            setMessage({ text: err?.message || "Unexpected error", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" p-3 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">Select Services to Show on Website</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allServices.map((service) => (
                    <div key={service._id} className={`border rounded-lg p-4 relative shadow transition ${selectedServiceIds.includes(service._id) ? "border-blue-600" : "border-gray-200"}`}>
                        <input type="checkbox" checked={selectedServiceIds.includes(service._id)} onChange={() => toggleSelect(service._id)} className="absolute top-3 right-3 w-5 h-5" />

                        {service.image?.url && <img src={service.image.url} alt={service.name} className="w-full h-32 object-cover rounded mb-2" />}

                        <h4 className="text-lg font-semibold">{service.name}</h4>
                        <p className="text-sm text-gray-600 line-clamp-3">{service.description}</p>
                    </div>
                ))}
            </div>

            <button onClick={handleSave} disabled={loading} className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
                {loading ? "Saving..." : "Save Selected Services"}
            </button>

            {message && <p className={`mt-4 text-sm ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>{message.text}</p>}
        </div>
    );
};

export default ServicesSelector;
