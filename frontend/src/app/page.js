import Footer from "../components/client/Footer/Footer";
import About from "../components/client/LandingPage/About";
import Contact from "../components/client/LandingPage/Contact";
import HeroSection from "../components/client/LandingPage/HeroSection";
import Portfolio from "../components/client/LandingPage/Portfolio";
import Services from "../components/client/LandingPage/Services";


export const metadata = {
    title: "Misoran Interior BD",
    description: "Premium Interior Design Services in Bangladesh",
};

export default function Home() {
    return (
        <main className="font-sans bg-white text-gray-900">
            {/* Hero Section */}
            <HeroSection />

            {/* About Section */}
            <About />

            {/* Services Section */}
            <Services />

            {/* Portfolio Section */}
            <Portfolio />

            {/* Contact Section */}
            <Contact />

            <Footer />
        </main>
    );
}
