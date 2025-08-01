"use client";

import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";

import { getSettingsApi, updateSettingsApi } from "@/src/api/settingsApi";

const AboutSettings = () => {
    const editor = useRef(null);
    const [about, setAbout] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    // Load about content from backend once on mount
    useEffect(() => {
        const loadData = async () => {
            const res = await getSettingsApi();
            if (!res.error && res.data?.about) {
                setAbout(res.data.about);
            }
        };

        loadData();
    }, []);

    const handleSubmit = async () => {
        if (!about.trim()) {
            setMessage({ text: "About content cannot be empty", type: "error" });
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("about", about);

        try {
            const res = await updateSettingsApi(formData);
            if (res.error) {
                setMessage({ text: res.message || "Something went wrong", type: "error" });
            } else {
                setMessage({ text: "Updated successfully", type: "success" });
            }
        } catch (err) {
            setMessage({ text: err?.message || "Unexpected error", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-3 rounded-xl ">
            <h2 className="text-2xl font-bold mb-4">Edit About Section</h2>

            <JoditEditor
                ref={editor}
                value={about}
                tabIndex={1}
                onBlur={(newContent) => setAbout(newContent)}
                onChange={() => {}}
                placeholder={about.trim() === "" ? "Start writing..." : ""} // show placeholder only when empty
            />

            <button onClick={handleSubmit} disabled={loading} className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
                {loading ? "Saving..." : "Save"}
            </button>

            {message && <p className={`mt-4 text-sm ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>{message.text}</p>}
        </div>
    );
};

export default AboutSettings;
