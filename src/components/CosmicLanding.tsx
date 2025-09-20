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

const CosmicLanding = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <div id="about">
          <About />
        </div>
        <div id="who-am-i">
          <WhoAmI />
        </div>
        <div id="formations">
          <Formations />
        </div>
        <div id="testimonials">
          <Testimonials />
        </div>
        <div id="services-products">
          <ServicesProducts />
        </div>
        <div id="services">
          <Services />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </main>
      
      {/* Footer cosmique */}
      <footer className="border-t border-cosmic-stellar-gold/20 bg-cosmic-deep-space/50 backdrop-blur-sm py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="flex justify-center mb-4">
              <img src={logoLevelUp} alt="LEVEL UP" className="h-16 w-auto" />
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 mb-8 text-sm">
            <a href="#" className="text-cosmic-star-white/60 hover:text-cosmic-stellar-gold transition-colors">
              Mentions Légales
            </a>
            <a href="#" className="text-cosmic-star-white/60 hover:text-cosmic-stellar-gold transition-colors">
              Politique de Confidentialité
            </a>
            <a href="#" className="text-cosmic-star-white/60 hover:text-cosmic-stellar-gold transition-colors">
              CGV
            </a>
          </div>
          
          <div className="text-cosmic-star-white/40 text-sm">
            © 2024 LEVEL UP. Tous droits réservés dans cette dimension et les suivantes.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CosmicLanding;