"use client";

import { faCaretDown, faCaretUp, faTachometerAlt, faUserTie, faStar, faCogs, faVideo, faTools, faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

const navGroups = [
    {
        label: "Dashboard",
        icon: faTachometerAlt,
        items: [{ label: "Home", href: "/admin/dashboard/home" }],
    },
    {
        label: "Services",
        icon: faTools, // wrench → tools (more suitable for services)
        items: [
            { label: "Create", href: "/admin/dashboard/service/create" },
            { label: "Show All", href: "/admin/dashboard/service" },
        ],
    },
    {
        label: "Projects",
        icon: faProjectDiagram, // boxOpen → projectDiagram (more visual for project)
        items: [
            { label: "Create", href: "/admin/dashboard/project/create" },
            { label: "Show All", href: "/admin/dashboard/project" },
        ],
    },
    {
        label: "Client",
        icon: faUserTie, // boxOpen → userTie (corporate client image)
        items: [
            { label: "Create", href: "/admin/dashboard/client/create" },
            { label: "Show All", href: "/admin/dashboard/client" },
        ],
    },
    {
        label: "Review",
        icon: faStar, // boxOpen → star (suits reviews/testimonials)
        items: [
            { label: "Create", href: "/admin/dashboard/review/create" },
            { label: "Show All", href: "/admin/dashboard/review" },
        ],
    },
    {
        label: "Videos",
        icon: faVideo, // plus → video (better visual for videos section)
        items: [
            { label: "Create", href: "/admin/dashboard/video/create" },
            { label: "Show All", href: "/admin/dashboard/video" },
        ],
    },
    {
        label: "Customize",
        icon: faCogs, // list → cogs (for configuration/customization)
        items: [
            { label: "About", href: "/admin/dashboard/customize/about" },
            { label: "Slider", href: "/admin/dashboard/customize/slider" },
            { label: "Service", href: "/admin/dashboard/customize/service" },
            { label: "Project", href: "/admin/dashboard/customize/project" },
            { label: "Video", href: "/admin/dashboard/customize/video" },
            { label: "Visibility", href: "/admin/dashboard/customize/visibility" },
        ],
    },
];

export default function SuperAdminDashboardlayout({ children }) {
    const [open, setOpen] = useState(false);
    const [groupOpen, setGroupOpen] = useState({});

    const toggleGroup = (label) => {
        setGroupOpen((prev) => ({ ...prev, [label]: !prev[label] }));
    };

    const linkClasses = "flex items-center gap-3 m-2 px-4 py-2 rounded-xl text-[15px] font-medium transition hover:bg-emerald-100 hover:text-emerald-800 text-emerald-900";

    return (
        <div className="min-h-screen text-emerald-900">
            {/* Mobile Menu */}
            <div className="md:hidden px-4 pt-4">
                <button
                    onClick={() => setOpen(!open)}
                    className="w-full flex justify-between items-center  backdrop-blur border border-emerald-300 px-4 py-3 rounded-xl shadow text-emerald-800 font-semibold"
                >
                    <span>Menu</span>
                    <FontAwesomeIcon icon={open ? faCaretUp : faCaretDown} />
                </button>

                {open && (
                    <div className="mt-3 rounded-2xl shadow-lg backdrop-blur-md border border-emerald-100 p-2">
                        {navGroups.map((group) => (
                            <div key={group.label}>
                                <button onClick={() => toggleGroup(group.label)} className={`${linkClasses} w-full justify-between`}>
                                    <div className="flex items-center gap-3">
                                        <FontAwesomeIcon icon={group.icon} className="text-emerald-600" />
                                        {group.label}
                                    </div>
                                    <FontAwesomeIcon icon={groupOpen[group.label] ? faCaretUp : faCaretDown} className="text-sm" />
                                </button>
                                {groupOpen[group.label] &&
                                    group.items.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setOpen(false)}
                                            className="ml-16 block text-sm py-2 hover:underline text-emerald-800 hover:text-emerald-600"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Desktop Layout */}
            <div className="grid grid-cols-12">
                {/* Sidebar */}
                <div className="hidden md:block col-span-2 p-5">
                    <div className="sticky top-5 bg-[#fefbfb] backdrop-blur-2xl rounded-3xl shadow-xl border border-emerald-100 p-4">
                        <h2 className="text-xl font-bold text-center text-emerald-700 mb-6">Admin Panel</h2>
                        {navGroups.map((group) => (
                            <div key={group.label} className="mb-3">
                                <button onClick={() => toggleGroup(group.label)} className={`${linkClasses} w-full justify-between`}>
                                    <div className="flex items-center gap-3">
                                        <FontAwesomeIcon icon={group.icon} className="text-emerald-600" />
                                        <span>{group.label}</span>
                                    </div>
                                    <FontAwesomeIcon icon={groupOpen[group.label] ? faCaretUp : faCaretDown} className="text-sm" />
                                </button>
                                {groupOpen[group.label] &&
                                    group.items.map((item) => (
                                        <Link key={item.href} href={item.href} className="ml-16 block text-sm py-2 hover:underline text-emerald-800 hover:text-emerald-600">
                                            {item.label}
                                        </Link>
                                    ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="col-span-12 md:col-span-10 mt-5 px-2 pb-5">
                    <div className="bg-[#fefbfb] rounded-2xl shadow-lg border border-emerald-100 p-3 md:p-6 backdrop-blur min-h-full">{children}</div>
                </div>
            </div>
        </div>
    );
}
