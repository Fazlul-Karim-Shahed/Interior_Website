"use client";

import React, { useEffect, useState } from "react";
import { createBookingApi } from "@/src/api/BookingApi";
import { getSettingsApi } from "@/src/api/settingsApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp, faFacebook, faLinkedin, faTwitter, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";

export default function Contact() {
    const [values, setValues] = useState({ name: "", email: "", message: "" });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formMessage, setFormMessage] = useState(null);
    const [contact, setContact] = useState(null);

    // ✅ Fetch contact info from settings
    useEffect(() => {
        const loadSettings = async () => {
            try {
                const res = await getSettingsApi();
                if (!res.error && res.data?.contact) {
                    setContact(res.data.contact);
                }
            } catch (err) {
                console.error("Failed to load contact info:", err);
            }
        };
        loadSettings();
    }, []);

    const validate = (vals) => {
        const errs = {};
        if (!vals.name) errs.name = "Name is required";
        if (!vals.email) {
            errs.email = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(vals.email)) {
            errs.email = "Invalid email address";
        }
        if (!vals.message) errs.message = "Message is required";
        return errs;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        setErrors(validate(values));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        setTouched({ name: true, email: true, message: true });

        if (Object.keys(validationErrors).length > 0) return;

        setIsSubmitting(true);
        setFormMessage(null);

        try {
            await createBookingApi(values);
            setValues({ name: "", email: "", message: "" });
            setTouched({});
            setErrors({});
            setFormMessage({
                type: "success",
                text: "Message sent successfully! We will contact you soon.",
            });
        } catch (error) {
            console.error("Submission failed:", error);
            setFormMessage({
                type: "error",
                text: "Something went wrong. Please try again later.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="pt-16 pb-12 px-6 md:px-20 bg-white text-gray-800">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-4">Start Your Interior Journey Today</h2>
                <p className="mb-10 max-w-2xl mx-auto text-center text-gray-500">Contact us to get a free consultation and see how we can help bring your vision to life.</p>

                <div className="flex flex-col lg:flex-row gap-12 pt-5">
                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="flex-1 bg-white rounded-2xl shadow-xl border border-gray-200 p-8" noValidate>
                        <h3 className="text-2xl font-bold mb-6 text-gray-700">Book a Free Consultation</h3>

                        {/* Name */}
                        <div className="mb-5">
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your full name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                className={`w-full px-4 py-2 rounded-md border placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                                    touched.name && errors.name ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {touched.name && errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div className="mb-5">
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="your.email@example.com"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                className={`w-full px-4 py-2 rounded-md border placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                                    touched.email && errors.email ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {touched.email && errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        {/* Message */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-1">Message</label>
                            <textarea
                                name="message"
                                rows="5"
                                placeholder="Write your message here..."
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.message}
                                className={`w-full px-4 py-2 rounded-md border placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                                    touched.message && errors.message ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {touched.message && errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </button>

                        {/* Success/Error Message */}
                        {formMessage && (
                            <div
                                className={`mt-4 text-sm font-medium px-4 py-3 rounded-md ${
                                    formMessage.type === "success" ? "bg-green-100 text-green-700 border border-green-300" : "bg-red-100 text-red-700 border border-red-300"
                                }`}
                            >
                                {formMessage.text}
                            </div>
                        )}
                    </form>

                    {/* Contact Info (Dynamic + Font Awesome) */}
                    <div className="flex-1 bg-gray-50 rounded-2xl shadow-md border border-gray-200 p-8 space-y-5">
                        <h3 className="text-2xl font-bold mb-8 text-gray-700">Contact Information</h3>

                        {contact && (
                            <>
                                {contact.phone1 && (
                                    <div className="flex items-center space-x-4">
                                        <FontAwesomeIcon icon={faPhone} className="text-indigo-600 text-xl" />
                                        <span className="text-lg text-gray-700">{contact.phone1}</span>
                                    </div>
                                )}
                                {contact.phone2 && (
                                    <div className="flex items-center space-x-4">
                                        <FontAwesomeIcon icon={faPhone} className="text-indigo-500 text-xl" />
                                        <span className="text-lg text-gray-700">{contact.phone2}</span>
                                    </div>
                                )}
                                {contact.gmail && (
                                    <div className="flex items-center space-x-4">
                                        <FontAwesomeIcon icon={faEnvelope} className="text-red-500 text-xl" />
                                        <span className="text-lg text-gray-700">{contact.gmail}</span>
                                    </div>
                                )}
                                {contact.whatsapp && (
                                    <div className="flex items-center space-x-4">
                                        <FontAwesomeIcon icon={faWhatsapp} className="text-green-500 text-xl" />
                                        <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" className="text-lg text-gray-700">
                                            {contact.whatsapp}
                                        </a>
                                    </div>
                                )}
                                {contact.address && (
                                    <div className="flex items-start space-x-4">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-orange-500 text-xl mt-1" />
                                        <address className="not-italic text-lg leading-snug text-gray-700">{contact.address}</address>
                                    </div>
                                )}

                                {/* Social Links */}
                                <div className="flex flex-wrap gap-6 pt-4">
                                    {contact.facebook && (
                                        <a href={contact.facebook} target="_blank" className="text-blue-600 text-lg flex items-center gap-2">
                                            <FontAwesomeIcon icon={faFacebook} />
                                            Facebook
                                        </a>
                                    )}
                                    {contact.linkedin && (
                                        <a href={contact.linkedin} target="_blank" className="text-blue-700 text-lg flex items-center gap-2">
                                            <FontAwesomeIcon icon={faLinkedin} />
                                            LinkedIn
                                        </a>
                                    )}
                                    {contact.twitter && (
                                        <a href={contact.twitter} target="_blank" className="text-sky-500 text-lg flex items-center gap-2">
                                            <FontAwesomeIcon icon={faTwitter} />
                                            Twitter
                                        </a>
                                    )}
                                    {contact.instagram && (
                                        <a href={contact.instagram} target="_blank" className="text-pink-500 text-lg flex items-center gap-2">
                                            <FontAwesomeIcon icon={faInstagram} />
                                            Instagram
                                        </a>
                                    )}
                                    {contact.youtube && (
                                        <a href={contact.youtube} target="_blank" className="text-red-600 text-lg flex items-center gap-2">
                                            <FontAwesomeIcon icon={faYoutube} />
                                            YouTube
                                        </a>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
