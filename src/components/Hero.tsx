import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/level-up-background.svg";
import forLadiesGentlemenLogo from "@/assets/for-ladies-gentlemen-logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showCosmicEffect, setShowCosmicEffect] = useState(false);
  return <section className="relative min-h-screen pt-24 flex items-center justify-center overflow-hidden" style={{
    backgroundImage: `url(${heroBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat'
  }}>
      {/* Overlay pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-cosmic-deep-space/40" />
      
      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 pt-28 md:pt-36">
        <div className="flex flex-col items-center text-center">
          {/* Logo avec effets cosmiques néon */}
          <div className="relative w-80 h-80 md:w-96 md:h-96 mb-8 md:mb-10 -mt-32">
            {showCosmicEffect && (
              <>
                {/* Étoiles orbitantes autour du logo */}
                <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
                  {/* Étoile 1 - Nord */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className="w-3 h-3 bg-cosmic-stellar-gold rounded-full animate-pulse shadow-[0_0_15px_hsl(var(--cosmic-stellar-gold))] relative">
                      <div className="absolute inset-0 bg-cosmic-stellar-gold rounded-full animate-ping"></div>
                    </div>
                  </div>
                  
                  {/* Étoile 2 - Nord-Est */}
                  <div className="absolute -top-4 -right-4">
                    <div className="w-2 h-2 bg-cosmic-nebula-green rounded-full animate-pulse shadow-[0_0_10px_hsl(var(--cosmic-nebula-green))] relative animation-delay-1000">
                      <div className="absolute inset-0 bg-cosmic-nebula-green rounded-full animate-ping animation-delay-1000"></div>
                    </div>
                  </div>
                  
                  {/* Étoile 3 - Est */}
                  <div className="absolute top-1/2 -right-6 transform -translate-y-1/2">
                    <div className="w-3 h-3 bg-cosmic-purple-pink rounded-full animate-pulse shadow-[0_0_15px_hsl(var(--cosmic-purple-pink))] relative animation-delay-2000">
                      <div className="absolute inset-0 bg-cosmic-purple-pink rounded-full animate-ping animation-delay-2000"></div>
                    </div>
                  </div>
                  
                  {/* Étoile 4 - Sud-Est */}
                  <div className="absolute -bottom-4 -right-4">
                    <div className="w-2 h-2 bg-cosmic-nebula-purple rounded-full animate-pulse shadow-[0_0_10px_hsl(var(--cosmic-nebula-purple))] relative animation-delay-3000">
                      <div className="absolute inset-0 bg-cosmic-nebula-purple rounded-full animate-ping animation-delay-3000"></div>
                    </div>
                  </div>
                  
                  {/* Étoile 5 - Sud */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                    <div className="w-3 h-3 bg-cosmic-royal-blue rounded-full animate-pulse shadow-[0_0_15px_hsl(var(--cosmic-royal-blue))] relative animation-delay-4000">
                      <div className="absolute inset-0 bg-cosmic-royal-blue rounded-full animate-ping animation-delay-4000"></div>
                    </div>
                  </div>
                  
                  {/* Étoile 6 - Sud-Ouest */}
                  <div className="absolute -bottom-4 -left-4">
                    <div className="w-2 h-2 bg-cosmic-stellar-gold rounded-full animate-pulse shadow-[0_0_10px_hsl(var(--cosmic-stellar-gold))] relative animation-delay-5000">
                      <div className="absolute inset-0 bg-cosmic-stellar-gold rounded-full animate-ping animation-delay-5000"></div>
                    </div>
                  </div>
                  
                  {/* Étoile 7 - Ouest */}
                  <div className="absolute top-1/2 -left-6 transform -translate-y-1/2">
                    <div className="w-3 h-3 bg-cosmic-nebula-green rounded-full animate-pulse shadow-[0_0_15px_hsl(var(--cosmic-nebula-green))] relative animation-delay-6000">
                      <div className="absolute inset-0 bg-cosmic-nebula-green rounded-full animate-ping animation-delay-6000"></div>
                    </div>
                  </div>
                  
                  {/* Étoile 8 - Nord-Ouest */}
                  <div className="absolute -top-4 -left-4">
                    <div className="w-2 h-2 bg-cosmic-purple-pink rounded-full animate-pulse shadow-[0_0_10px_hsl(var(--cosmic-purple-pink))] relative animation-delay-7000">
                      <div className="absolute inset-0 bg-cosmic-purple-pink rounded-full animate-ping animation-delay-7000"></div>
                    </div>
                  </div>
                </div>

                {/* Effets néon multiples couches autour du logo */}
                <div className="absolute inset-0 bg-gradient-to-br from-cosmic-stellar-gold/20 via-cosmic-nebula-green/20 to-cosmic-purple-pink/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -inset-4 bg-gradient-to-br from-cosmic-nebula-purple/15 via-cosmic-royal-blue/15 to-cosmic-stellar-gold/15 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
                <div className="absolute -inset-2 bg-gradient-to-br from-cosmic-purple-pink/10 via-cosmic-nebula-green/10 to-cosmic-nebula-purple/10 rounded-full blur-xl animate-pulse animation-delay-2000"></div>

                {/* Petites particules cosmiques fixes */}
                <div className="absolute top-12 left-16 w-1 h-1 bg-cosmic-star-white rounded-full animate-ping animation-delay-1000"></div>
                <div className="absolute top-20 right-20 w-0.5 h-0.5 bg-cosmic-stellar-gold rounded-full animate-pulse animation-delay-2000"></div>
                <div className="absolute bottom-16 left-20 w-1 h-1 bg-cosmic-nebula-green rounded-full animate-ping animation-delay-3000"></div>
                <div className="absolute bottom-12 right-16 w-0.5 h-0.5 bg-cosmic-purple-pink rounded-full animate-pulse animation-delay-4000"></div>
                <div className="absolute top-1/3 left-8 w-0.5 h-0.5 bg-cosmic-nebula-purple rounded-full animate-ping animation-delay-5000"></div>
                <div className="absolute bottom-1/3 right-8 w-1 h-1 bg-cosmic-royal-blue rounded-full animate-pulse animation-delay-6000"></div>
              </>
            )}
            
            {/* Logo avec glow effect */}
            <div 
              className="relative w-full h-full flex items-center justify-center cursor-pointer"
              onClick={() => setShowCosmicEffect(!showCosmicEffect)}
            >
              <img 
                src={forLadiesGentlemenLogo} 
                alt="For Ladies Gentlemen - Level Up" 
                className={`w-full h-full object-contain relative z-10 transition-all duration-500 ${
                  showCosmicEffect 
                    ? "drop-shadow-[0_0_35px_hsl(var(--cosmic-stellar-gold)/0.9)]" 
                    : "drop-shadow-[0_0_10px_hsl(var(--cosmic-stellar-gold)/0.3)] hover:drop-shadow-[0_0_20px_hsl(var(--cosmic-stellar-gold)/0.5)]"
                }`}
              />
            </div>
          </div>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-cosmic-nebula-purple via-cosmic-purple-pink to-cosmic-royal-blue hover:from-cosmic-nebula-green hover:via-cosmic-stellar-gold hover:to-cosmic-purple-pink text-cosmic-star-white font-bold px-12 py-5 text-lg -mt-10 hover:scale-110 transition-all duration-500 shadow-[0_0_40px_hsl(var(--cosmic-nebula-purple)/0.6),0_0_60px_hsl(var(--cosmic-purple-pink)/0.4)] hover:shadow-[0_0_60px_hsl(var(--cosmic-nebula-green)/0.8),0_0_80px_hsl(var(--cosmic-stellar-gold)/0.6)] border border-cosmic-star-white/20 hover:border-cosmic-stellar-gold/50 rounded-xl backdrop-blur-sm"
            onClick={() => navigate('/auth')}
          >
            {t('hero.signup')}
          </Button>
        </div>
      </div>
      
    </section>;
};
export default Hero;