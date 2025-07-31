"use client";

import React from "react";
import { useFormik } from "formik";

export default function Contact() {
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
        onSubmit: (values, { resetForm }) => {
            alert(`Form submitted:\n${JSON.stringify(values, null, 2)}`);
            resetForm();
        },
    });

    return (
        <section className="pt-16 pb-12 px-6 md:px-20 bg-white text-gray-800">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-4">Start Your Interior Journey Today</h2>
                <p className="mb-10 max-w-2xl mx-auto text-center text-gray-500">Contact us to get a free consultation and see how we can help bring your vision to life.</p>

                <div className="flex flex-col lg:flex-row gap-12 pt-5">
                    {/* Contact Form */}
                    <form onSubmit={formik.handleSubmit} className="flex-1 bg-white rounded-2xl shadow-xl border border-gray-200 p-8" noValidate>
                        <h3 className="text-2xl font-bold mb-6 text-gray-700">Book a Free Consultation</h3>

                        {/* Name */}
                        <div className="mb-5">
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your full name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                className={`w-full px-4 py-2 rounded-md border placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                                    formik.touched.name && formik.errors.name ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {formik.touched.name && formik.errors.name && <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div className="mb-5">
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="your.email@example.com"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                className={`w-full px-4 py-2 rounded-md border placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                                    formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {formik.touched.email && formik.errors.email && <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>}
                        </div>

                        {/* Message */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-1">Message</label>
                            <textarea
                                name="message"
                                rows="5"
                                placeholder="Write your message here..."
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.message}
                                className={`w-full px-4 py-2 rounded-md border placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                                    formik.touched.message && formik.errors.message ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                            {formik.touched.message && formik.errors.message && <p className="text-red-500 text-sm mt-1">{formik.errors.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={formik.isSubmitting}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {formik.isSubmitting ? "Sending..." : "Send Message"}
                        </button>
                    </form>

                    {/* Contact Info */}
                    <div className="flex-1 bg-gray-50 rounded-2xl shadow-md border border-gray-200 p-8 space-y-6">
                        <h3 className="text-2xl font-bold mb-4 text-gray-700">Contact Information</h3>

                        <div className="flex items-center space-x-4">
                            <span className="text-indigo-600 text-xl">📞</span>
                            <span className="text-lg text-gray-700">+880 1234 567890</span>
                        </div>

                        <div className="flex items-center space-x-4">
                            <span className="text-indigo-600 text-xl">📧</span>
                            <span className="text-lg text-gray-700">info@yourinterior.com</span>
                        </div>

                        <div className="flex items-start space-x-4">
                            <span className="text-indigo-600 text-xl">📍</span>
                            <address className="not-italic text-lg leading-snug text-gray-700">
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
