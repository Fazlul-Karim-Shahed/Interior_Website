"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { getSettingsApi, updateSettingsApi } from "@/src/api/settingsApi";

const VISIBILITY_FIELDS = [
    { key: "heroVisibility", label: "Hero Section" },
    { key: "aboutVisibility", label: "About Section" },
    { key: "servicesVisibility", label: "Services Section" },
    { key: "whyChooseUsVisibility", label: "Why Choose Us Section" },
    { key: "projectsVisibility", label: "Projects Section" },
    { key: "videosVisibility", label: "Videos Section" },
    { key: "workingProcessVisibility", label: "Working Process Section" },
    { key: "reviewVisibility", label: "Review Section" },
    { key: "clientVisibility", label: "Client Section" },
    { key: "contactVisibility", label: "Contact Section" },
];

export default function VisibilitySettings() {
    const [visibility, setVisibility] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    // ✅ Fetch settings on mount
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                getSettingsApi().then((data) => {
                    if (!data.error) {
                        const initial = {};
                        for (const { key } of VISIBILITY_FIELDS) {
                            initial[key] = data.data[key] ?? true;
                        }
                        setVisibility(initial);
                    }
                });
            } catch (err) {
                console.error("Failed to fetch settings", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleChange = (key) => {
        setVisibility((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage("");

        try {
            updateSettingsApi(visibility).then((data) => {
                setMessage(data.message);
            });
        } catch (error) {
            console.error(error);
            setMessage("❌ Failed to update settings.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-center py-10">Loading settings...</div>;

    return (
        <div className="max-w-xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Visibility Settings</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {VISIBILITY_FIELDS.map(({ key, label }) => (
                    <div key={key} className="flex justify-between items-center bg-white p-4 rounded shadow border">
                        <label htmlFor={key} className="text-gray-700 font-medium">
                            {label}
                        </label>
                        <input type="checkbox" id={key} checked={visibility[key] || false} onChange={() => handleChange(key)} className="w-5 h-5 accent-blue-600" />
                    </div>
                ))}

                <button type="submit" disabled={saving} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                    {saving ? "Saving..." : "Save Changes"}
                </button>

                {message && <p className="text-center mt-4 text-sm text-gray-700">{message}</p>}
            </form>
        </div>
    );
}
