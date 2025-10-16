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
  const [activeZone, setActiveZone] = useState<string | null>(null);
  
  const handleZoneClick = (section: string, zoneId: string) => {
    setActiveZone(zoneId);
    setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => setActiveZone(null), 1000);
    }, 300);
  };
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
            
            {/* Logo avec glow effect et zones cliquables géométriques */}
            <div 
              className="relative w-full h-full flex items-center justify-center group"
              onMouseEnter={() => setShowCosmicEffect(true)}
              onMouseLeave={() => setShowCosmicEffect(false)}
            >
              <img 
                src={forLadiesGentlemenLogo} 
                alt="For Ladies Gentlemen - Level Up" 
                className="w-full h-full object-contain relative z-10 transition-all duration-500"
              />
              
              {/* Zones cliquables géométriques précises */}
              <div className="absolute inset-0 z-20">
                {/* Pilier supérieur gauche - Triangle */}
                <div
                  className="absolute top-[15%] left-[20%] w-[15%] h-[30%] cursor-pointer transition-all duration-300"
                  style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                  onClick={() => handleZoneClick('services', 'zone1')}
                >
                  <div 
                    className={`w-full h-full transition-all duration-300 ${
                      activeZone === 'zone1' 
                        ? 'bg-cosmic-nebula-green shadow-[0_0_30px_hsl(var(--cosmic-nebula-green))]' 
                        : 'hover:bg-cosmic-nebula-green/20'
                    }`}
                  />
                </div>
                
                {/* Pilier supérieur droit - Rectangle */}
                <div
                  className="absolute top-[15%] right-[20%] w-[15%] h-[30%] cursor-pointer transition-all duration-300"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                  onClick={() => handleZoneClick('formations', 'zone2')}
                >
                  <div 
                    className={`w-full h-full transition-all duration-300 ${
                      activeZone === 'zone2' 
                        ? 'bg-cosmic-purple-pink shadow-[0_0_30px_hsl(var(--cosmic-purple-pink))]' 
                        : 'hover:bg-cosmic-purple-pink/20'
                    }`}
                  />
                </div>
                
                {/* Pilier central gauche - Hexagone */}
                <div
                  className="absolute top-[35%] left-[15%] w-[20%] h-[30%] cursor-pointer transition-all duration-300"
                  style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
                  onClick={() => handleZoneClick('about', 'zone3')}
                >
                  <div 
                    className={`w-full h-full transition-all duration-300 ${
                      activeZone === 'zone3' 
                        ? 'bg-cosmic-stellar-gold shadow-[0_0_30px_hsl(var(--cosmic-stellar-gold))]' 
                        : 'hover:bg-cosmic-stellar-gold/20'
                    }`}
                  />
                </div>
                
                {/* Pilier central droit - Cercle */}
                <div
                  className="absolute top-[35%] right-[15%] w-[20%] h-[30%] cursor-pointer transition-all duration-300 rounded-full"
                  onClick={() => handleZoneClick('testimonials', 'zone4')}
                >
                  <div 
                    className={`w-full h-full rounded-full transition-all duration-300 ${
                      activeZone === 'zone4' 
                        ? 'bg-cosmic-royal-blue shadow-[0_0_30px_hsl(var(--cosmic-royal-blue))]' 
                        : 'hover:bg-cosmic-royal-blue/20'
                    }`}
                  />
                </div>
                
                {/* Base du carré - Qui suis-je - Trapèze avec effet d'ouverture */}
                <div
                  className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[60%] h-[25%] cursor-pointer transition-all duration-300"
                  style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }}
                  onClick={() => handleZoneClick('who-am-i', 'zone5')}
                >
                  <div 
                    className={`w-full h-full transition-all duration-500 ${
                      activeZone === 'zone5' 
                        ? 'bg-cosmic-nebula-purple shadow-[0_0_40px_hsl(var(--cosmic-nebula-purple))]' 
                        : 'hover:bg-cosmic-nebula-purple/20'
                    }`}
                  >
                    {/* Effet d'ouverture de bas en haut */}
                    <div className={`absolute bottom-0 left-0 w-full transition-all duration-700 ${
                      activeZone === 'zone5' ? 'h-full' : 'h-0'
                    } bg-gradient-to-t from-cosmic-nebula-purple/50 to-transparent`} />
                  </div>
                </div>
              </div>
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