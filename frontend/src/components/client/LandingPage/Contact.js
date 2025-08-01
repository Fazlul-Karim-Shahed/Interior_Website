"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import { createBookingApi } from "@/src/api/BookingApi";

export default function Contact() {
    const [formMessage, setFormMessage] = useState(null); // { type: 'success' | 'error', text: string }

    const formik = useFormik({
        initialValues: { name: "", email: "", message: "" },
        validate: (values) => {
            const errors = {};
            if (!values.name) errors.name = "Name is required";
            if (!values.email) {
                errors.email = "Email is required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = "Invalid email address";
            }
            if (!values.message) errors.message = "Message is required";
            return errors;
        },
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            setFormMessage(null);
            try {
                const res = await createBookingApi(values);
                setFormMessage({ type: "success", text: "Message sent successfully! We’ll be in touch soon." });
                resetForm();
            } catch (err) {
                console.error("Submission failed:", err);
                setFormMessage({ type: "error", text: "Something went wrong. Please try again later." });
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <section className="pt-10 pb-12 px-6 md:px-20 bg-brand-600 text-white">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-center">Start Your Interior Journey Today</h2>
                <p className="mb-10 max-w-2xl mx-auto text-center text-brand-100">Contact us to get a free consultation and see how we can help bring your vision to life.</p>

                <div className="flex flex-col lg:flex-row gap-12 pt-5">
                    {/* Contact Form */}
                    <form onSubmit={formik.handleSubmit} className="bg-white rounded-lg p-6 flex-1 shadow-lg text-gray-900" noValidate>
                        <h3 className="text-2xl font-semibold mb-6 text-brand-700">Booking for free consultancy</h3>

                        {/* Name */}
                        <label className="block mb-4">
                            <span className="font-medium text-gray-700">Name</span>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your full name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                className={`mt-1 block w-full rounded-md border px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                                    formik.touched.name && formik.errors.name ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {formik.touched.name && formik.errors.name && <p className="text-red-600 text-sm mt-1">{formik.errors.name}</p>}
                        </label>

                        {/* Email */}
                        <label className="block mb-4">
                            <span className="font-medium text-gray-700">Email</span>
                            <input
                                type="email"
                                name="email"
                                placeholder="your.email@example.com"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                className={`mt-1 block w-full rounded-md border px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                                    formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {formik.touched.email && formik.errors.email && <p className="text-red-600 text-sm mt-1">{formik.errors.email}</p>}
                        </label>

                        {/* Message */}
                        <label className="block mb-6">
                            <span className="font-medium text-gray-700">Message</span>
                            <textarea
                                name="message"
                                rows="5"
                                placeholder="Write your message here..."
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.message}
                                className={`mt-1 block w-full rounded-md border px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                                    formik.touched.message && formik.errors.message ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {formik.touched.message && formik.errors.message && <p className="text-red-600 text-sm mt-1">{formik.errors.message}</p>}
                        </label>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={formik.isSubmitting}
                            className="w-full bg-brand-700 text-white font-semibold py-3 rounded-md shadow-md hover:bg-brand-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {formik.isSubmitting ? "Sending..." : "Send Message"}
                        </button>

                        {/* Success or Error Message */}
                        {formMessage && (
                            <div
                                className={`mt-4 px-4 py-3 text-sm rounded-md font-medium border ${
                                    formMessage.type === "success" ? "bg-green-100 text-green-700 border-green-300" : "bg-red-100 text-red-700 border-red-300"
                                }`}
                            >
                                {formMessage.text}
                            </div>
                        )}
                    </form>

                    {/* Direct Contact Info */}
                    <div className="flex-1 text-brand-100 space-y-6">
                        <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>

                        <div className="flex items-center space-x-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M3 10h2l3 7 4-14 3 7h4"></path>
                            </svg>
                            <span className="text-lg">+880 1234 567890</span>
                        </div>

                        <div className="flex items-center space-x-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"></path>
                                <path d="M12 14v7"></path>
                                <path d="M18 20h-12"></path>
                            </svg>
                            <span className="text-lg">info@yourinterior.com</span>
                        </div>

                        <div className="flex items-center space-x-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M3 5h18M9 3v2M15 3v2M4 7h16v14H4z"></path>
                            </svg>
                            <address className="not-italic text-lg">
                                123 Interior St,
                                <br />
                                Dhaka, Bangladesh
                            </address>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
