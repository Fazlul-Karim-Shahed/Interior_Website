"use client";

import Image from "next/image";


export default function AboutPage() {
    return (
        <main className="min-h-screen text-gray-800 font-sans">
            {/* Banner Section */}
            <section className="relative w-full h-[60vh] overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1092&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Interior Vision"
                    fill
                    className="object-cover"
                    quality={90}
                    priority
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center px-4">
                    <div>
                        <h1 className="text-white text-4xl md:text-6xl font-extrabold drop-shadow-lg">Our Vision</h1>
                        <p className="text-white text-md md:text-lg mt-4 max-w-xl mx-auto opacity-80">Elegance, functionality, and soulful design — shaping timeless interiors.</p>
                    </div>
                </div>
            </section>

            {/* Vision Content */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="bg-gray-50 border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 rounded-3xl p-8 sm:p-12">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 border-l-4 border-brand-600 pl-4 text-gray-900">At Misoran Interior</h2>

                    <div className="space-y-5 text-gray-700 text-base sm:text-lg leading-relaxed">
                        <p>
                            Our vision is to become the leading interior design company in Bangladesh, recognized for creating innovative, functional, and sustainable spaces that inspire and elevate
                            lives.
                        </p>
                        <p>
                            We envision transforming spaces into timeless masterpieces that reflect the soul of our clients. We aspire to be the beacon of innovation and elegance in interior design,
                            seamlessly blending artistry with functionality.
                        </p>
                        <p>Our commitment is to craft environments that inspire, elevate, and endure— creating not just beautiful interiors, but cherished experiences.</p>
                        <p>
                            Driven by passion and precision, we aim to set new standards of sophistication and excellence in every project, making Misoran Interior synonymous with grace, integrity,
                            and visionary design.
                        </p>
                    </div>
                </div>
            </section>

            {/* Bottom Highlight Cards Section */}
            <section className="max-w-7xl mx-auto px-4 pt-10 pb-24">
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-16">Why Choose Misoran Interior</h2>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                    {[
                        {
                            title: "Innovative Designs",
                            desc: "We blend creativity and practicality to create truly unique, livable spaces.",
                            color: "from-indigo-500 to-purple-500",
                            icon: "🎨",
                        },
                        {
                            title: "Client-Centric",
                            desc: "Your vision is our mission. We tailor every detail to match your dream.",
                            color: "from-green-500 to-teal-500",
                            icon: "🤝",
                        },
                        {
                            title: "Sustainable Approach",
                            desc: "We prioritize eco-friendly materials and sustainable design practices.",
                            color: "from-yellow-400 to-orange-500",
                            icon: "🌿",
                        },
                        {
                            title: "Precision Execution",
                            desc: "From planning to delivery, our team ensures flawless execution every time.",
                            color: "from-pink-500 to-red-500",
                            icon: "📐",
                        },
                    ].map((item, idx) => (
                        <div key={idx} className={`bg-gradient-to-br ${item.color} text-white p-4 md:p-8 rounded-3xl shadow-xl transform hover:scale-105 transition duration-300 group`}>
                            <div className="mb-6 flex justify-center">
                                <div className="bg-white/20 backdrop-blur-md p-5 rounded-full shadow-inner">
                                    <span className="text-3xl">{item.icon}</span>
                                </div>
                            </div>
                            <h3 className="md:text-xl font-semibold text-center mb-3">{item.title}</h3>
                            <p className="text-center text-xs md:text-sm text-white/90">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
