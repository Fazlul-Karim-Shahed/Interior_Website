"use client";

import React, { useEffect, useState } from "react";
import { getSettingsApi, updateSettingsApi } from "@/src/api/settingsApi";

const ContactSettings = () => {
    const [contact, setContact] = useState({
        gmail: "",
        whatsapp: "",
        phone1: "",
        phone2: "",
        facebook: "",
        linkedin: "",
        twitter: "",
        instagram: "",
        youtube: "",
        address: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    // ✅ Load contact info from backend
    useEffect(() => {
        const loadData = async () => {
            const res = await getSettingsApi();
            if (!res.error && res.data?.contact) {
                setContact(res.data.contact);
            }
        };
        loadData();
    }, []);

    // ✅ Handle field change
    const handleChange = (e) => {
        setContact((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // ✅ Save updates
    const handleSubmit = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("contact", JSON.stringify(contact)); // 👈 send as JSON string

        try {
            const res = await updateSettingsApi(formData);
            if (res.error) {
                setMessage({ text: res.message || "Something went wrong", type: "error" });
            } else {
                setMessage({ text: "Contact updated successfully", type: "success" });
            }
        } catch (err) {
            setMessage({ text: err?.message || "Unexpected error", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-3 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Edit Contact Section</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Gmail</label>
                    <input type="email" name="gmail" value={contact.gmail} onChange={handleChange} placeholder="Enter Gmail address" className="border p-2 rounded w-full" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">WhatsApp</label>
                    <input type="text" name="whatsapp" value={contact.whatsapp} onChange={handleChange} placeholder="Enter WhatsApp number" className="border p-2 rounded w-full" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Phone 1</label>
                    <input type="text" name="phone1" value={contact.phone1} onChange={handleChange} placeholder="Enter primary phone number" className="border p-2 rounded w-full" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Phone 2</label>
                    <input type="text" name="phone2" value={contact.phone2} onChange={handleChange} placeholder="Enter secondary phone number" className="border p-2 rounded w-full" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Facebook</label>
                    <input type="text" name="facebook" value={contact.facebook} onChange={handleChange} placeholder="Facebook profile link" className="border p-2 rounded w-full" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">LinkedIn</label>
                    <input type="text" name="linkedin" value={contact.linkedin} onChange={handleChange} placeholder="LinkedIn profile link" className="border p-2 rounded w-full" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Twitter</label>
                    <input type="text" name="twitter" value={contact.twitter} onChange={handleChange} placeholder="Twitter profile link" className="border p-2 rounded w-full" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Instagram</label>
                    <input type="text" name="instagram" value={contact.instagram} onChange={handleChange} placeholder="Instagram profile link" className="border p-2 rounded w-full" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">YouTube</label>
                    <input type="text" name="youtube" value={contact.youtube} onChange={handleChange} placeholder="YouTube channel link" className="border p-2 rounded w-full" />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <textarea name="address" value={contact.address} onChange={handleChange} placeholder="Enter address" className="border p-2 rounded w-full" />
                </div>
            </div>

            <button onClick={handleSubmit} disabled={loading} className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
                {loading ? "Saving..." : "Save"}
            </button>

            {message && <p className={`mt-4 text-sm ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>{message.text}</p>}
        </div>
    );
};

export default ContactSettings;
