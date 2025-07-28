import Image from "next/image";

export const metadata = {
    title: "Greenview Interior BD",
    description: "Premium Interior Design Services in Bangladesh",
};

export default function Home() {
    return (
        <main className="font-sans bg-white text-gray-900">
            {/* Hero Section */}
            <section className="relative bg-black text-white h-[90vh] flex items-center justify-center">
                <Image src="/hero.jpg" alt="Interior Hero" layout="fill" objectFit="cover" quality={90} className="z-0 opacity-70" />
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Transform Your Living Space</h1>
                    <p className="text-lg md:text-xl mb-6">Elegant and functional interior design tailored to your vision.</p>
                    <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 transition rounded text-white font-medium">Book Free Consultation</button>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 px-6 md:px-20 bg-gray-100 text-center">
                <h2 className="text-3xl md:text-4xl font-semibold mb-10">Our Services</h2>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {[
                        { title: "Home Interior", desc: "Personalized design for your home." },
                        { title: "Office Interior", desc: "Modern & productive workspace design." },
                        { title: "Custom Furniture", desc: "Unique furniture for every space." },
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white p-6 rounded shadow hover:shadow-lg transition">
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            <p className="text-gray-600">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* About Section */}
            <section className="py-16 px-6 md:px-20 text-center">
                <h2 className="text-3xl md:text-4xl font-semibold mb-6">About Greenview</h2>
                <p className="text-gray-700 max-w-3xl mx-auto">
                    We are a passionate team of interior designers dedicated to transforming ordinary spaces into extraordinary environments. With years of experience and a deep love for aesthetics,
                    we bring functionality, beauty, and comfort together.
                </p>
            </section>

            {/* Portfolio Section */}
            <section className="py-16 px-6 md:px-20 bg-gray-100 text-center">
                <h2 className="text-3xl md:text-4xl font-semibold mb-10">Our Portfolio</h2>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="rounded overflow-hidden shadow">
                            <Image src={`/portfolio${i}.jpg`} alt={`Project ${i}`} width={600} height={400} className="w-full h-auto" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 px-6 md:px-20 text-center bg-emerald-600 text-white">
                <h2 className="text-3xl md:text-4xl font-semibold mb-4">Start Your Interior Journey Today</h2>
                <p className="mb-6 max-w-xl mx-auto">Contact us to get a free consultation and see how we can help bring your vision to life.</p>
                <a href="#" className="inline-block px-6 py-3 bg-white text-emerald-700 font-semibold rounded shadow hover:bg-gray-100 transition">
                    Contact Us
                </a>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white text-center py-6 text-sm">© {new Date().getFullYear()} Greenview Interior BD. All rights reserved.</footer>
        </main>
    );
}
