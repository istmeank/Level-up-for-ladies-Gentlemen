import { Button } from "@/components/ui/button";
import logoLevelUp from "@/assets/logo-level-up-new.png";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";

const Navigation = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cosmic-deep-space/80 backdrop-blur-lg border-b border-cosmic-stellar-gold/20">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        {/* Logo avec effet flouté */}
        <div className="relative flex items-center">
          <div className="absolute inset-0 bg-cosmic-deep-space/60 backdrop-blur-md rounded-lg -z-10 transform scale-110"></div>
          <img 
            src={logoLevelUp} 
            alt="LEVEL UP" 
            className="h-20 w-auto object-contain hover:scale-110 transition-transform duration-300 filter hover:drop-shadow-[0_0_8px_hsl(var(--cosmic-stellar-gold)/0.6)] relative z-10"
          />
        </div>

        {/* Navigation links - cachés sur mobile */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-cosmic-star-white/80 hover:text-cosmic-stellar-gold transition-colors">
            {t('nav.mission')}
          </a>
          <a href="#who-am-i" className="text-cosmic-star-white/80 hover:text-cosmic-stellar-gold transition-colors">
            {t('nav.whoAmI')}
          </a>
          <a href="#formations" className="text-cosmic-star-white/80 hover:text-cosmic-stellar-gold transition-colors">
            {t('nav.formations')}
          </a>
          <a href="#services-products" className="text-cosmic-star-white/80 hover:text-cosmic-stellar-gold transition-colors">
            {t('nav.servicesProducts')}
          </a>
          <a href="#contact" className="text-cosmic-star-white/80 hover:text-cosmic-stellar-gold transition-colors">
            {t('nav.contact')}
          </a>
        </div>

        {/* Actions section avec sélecteur de langue et bouton de connexion */}
        <div className="flex items-center gap-3">
          <LanguageSelector />
          
          {/* CTA Button */}
          <Button 
            variant="stellar" 
            size="sm"
            onClick={() => navigate("/auth")}
          >
            {t('nav.login')}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;