import Navigation from "./Navigation";
import Hero from "./Hero";
import About from "./About";
import WhoAmI from "./WhoAmI";
import Formations from "./Formations";
import ServicesProducts from "./ServicesProducts";
import Services from "./Services";
import Contact from "./Contact";
import Testimonials from "./Testimonials";
import logoLevelUp from "@/assets/logo-level-up-new.png";
import { useTranslation } from "react-i18next";
import StarField from "./StarField";
import RevealOnScroll from "./RevealOnScroll";

const CosmicLanding = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background relative">
      <StarField />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <div id="about">
          <RevealOnScroll>
            <About />
          </RevealOnScroll>
        </div>
        <div id="who-am-i">
          <RevealOnScroll delay={200}>
            <WhoAmI />
          </RevealOnScroll>
        </div>
        <div id="formations">
          <RevealOnScroll>
            <Formations />
          </RevealOnScroll>
        </div>
        <div id="testimonials">
          <RevealOnScroll delay={200}>
            <Testimonials />
          </RevealOnScroll>
        </div>
        <div id="services-products">
          <RevealOnScroll>
            <ServicesProducts />
          </RevealOnScroll>
        </div>
        <div id="services">
          <RevealOnScroll delay={200}>
            <Services />
          </RevealOnScroll>
        </div>
        <div id="contact">
          <RevealOnScroll>
            <Contact />
          </RevealOnScroll>
        </div>
      </main>

      {/* Footer cosmique */}
      <footer className="border-t border-cosmic-stellar-gold/20 bg-cosmic-deep-space/50 backdrop-blur-sm py-12 relative z-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="flex justify-center mb-4">
              <img src={logoLevelUp} alt="LEVEL UP" className="h-16 w-auto" />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mb-8 text-sm">
            <a href="#" className="text-cosmic-star-white/60 hover:text-cosmic-stellar-gold transition-colors">
              {t('footer.legal')}
            </a>
            <a href="#" className="text-cosmic-star-white/60 hover:text-cosmic-stellar-gold transition-colors">
              {t('footer.privacy')}
            </a>
            <a href="#" className="text-cosmic-star-white/60 hover:text-cosmic-stellar-gold transition-colors">
              {t('footer.terms')}
            </a>
          </div>

          <div className="text-cosmic-star-white/40 text-sm">
            {t('footer.copyright')}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CosmicLanding;