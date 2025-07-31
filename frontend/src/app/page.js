import { getSettingsApi } from "../api/settingsApi";
import Footer from "../components/client/Footer/Footer";
import About from "../components/client/LandingPage/About";
import Client from "../components/client/LandingPage/Client";
import ClientReviewSection from "../components/client/LandingPage/ClientReviewSection";
import Contact from "../components/client/LandingPage/Contact";
import HeroSection from "../components/client/LandingPage/HeroSection";
import Portfolio from "../components/client/LandingPage/Portfolio";
import ProjectVideoSection from "../components/client/LandingPage/ProjectVideoSection";
import Services from "../components/client/LandingPage/Services";
import WhyChooseUs from "../components/client/LandingPage/WhyChooseUs";
import WorkingProcess from "../components/client/LandingPage/WorkingProcess";

export const metadata = {
    title: "Misoran Interior BD",
    description: "Premium Interior Design Services in Bangladesh",
};

export default async function Home() {
    let settings = await getSettingsApi();

    settings = settings.data.error ? null : settings.data;

    return (
        <main className="font-sans bg-white text-gray-900">
            <HeroSection />

            <About about={settings ? settings.about : null} />

            <Services services={settings ? settings.services : []} />

            <WhyChooseUs />

            <Portfolio projects={settings ? settings.projects : []} />

            <ProjectVideoSection videos={settings ? settings.videos : []} />

            <WorkingProcess />

            <ClientReviewSection />

            <Client />

            <Contact />

            <Footer />
        </main>
    );
}
