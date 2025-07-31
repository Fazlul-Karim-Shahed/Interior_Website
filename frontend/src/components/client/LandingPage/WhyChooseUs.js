"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar, faCircleCheck, faPeopleGroup, faShieldHalved } from "@fortawesome/free-solid-svg-icons";

// More varied and distinct colors from your custom palette
const features = [
    {
        icon: faSackDollar,
        title: "Flexible Budget & Taste",
        desc: "Tailored pricing to match your unique style and needs.",
        color: "from-brand-indigo-500 to-brand-indigo-700",
    },
    {
        icon: faCircleCheck,
        title: "2 Years Free Warranty",
        desc: "Enjoy long-term peace of mind with our extended warranty.",
        color: "from-brand-pink-500 to-brand-pink-700",
    },
    {
        icon: faPeopleGroup,
        title: "Experienced Creative Team",
        desc: "Our skilled team turns your vision into reality with creativity.",
        color: "from-brand-violet-500 to-brand-violet-700",
    },
    {
        icon: faShieldHalved,
        title: "Quality & Commitment",
        desc: "We uphold the highest standards to deliver excellence.",
        color: "from-brand-dark-navy-500 to-brand-dark-navy-700",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="pt-10 pb-16 px-6">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-brand-600 mb-16">Why Choose Us</h2>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-7 lg:gap-10">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`bg-gradient-to-br ${feature.color} text-white py-8 px-2 md:py-8 md:px-8 rounded-2xl shadow-xl transition-transform duration-300 transform hover:scale-105 group`}
                        >
                            <div className="mb-5 flex justify-center">
                                <div className="bg-white/20 p-4 rounded-full">
                                    <FontAwesomeIcon icon={feature.icon} className="text-white text-3xl" />
                                </div>
                            </div>
                            <h3 className="sm:text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-xs sm:text-sm text-white/90 hidden md:block">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
