import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SoftwareSection from './components/SoftwareSection';
import MarketingSection from './components/MarketingSection';
import CaseStudies from './components/CaseStudies';
import Methodology from './components/Methodology';
import WhyChooseUs from './components/WhyChooseUs';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

const App: React.FC = () => {
  return (
    <div className="bg-deepBlue min-h-screen text-white font-sans selection:bg-electricBlue selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <SoftwareSection />
        <MarketingSection />
        <CaseStudies />
        <Methodology />
        <WhyChooseUs />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default App;