import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/level-up-background.svg";
import forLadiesGentlemenLogo from "@/assets/for-ladies-gentlemen-logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  
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
          {/* Logo avec effet de flottaison */}
          <div className="relative w-80 h-80 md:w-96 md:h-96 mb-8 md:mb-10 -mt-32">
            {/* Logo avec zones cliquables géométriques */}
            <div 
              className="relative w-full h-full flex items-center justify-center group"
            >
              <img 
                src={forLadiesGentlemenLogo} 
                alt="For Ladies Gentlemen - Level Up" 
                className="w-full h-full object-contain relative z-10 transition-all duration-500 animate-galactic-rotate"
              />
              
              {/* Zones cliquables précises sur les éléments du logo */}
              <div className="absolute inset-0 z-20">
                {/* Pilier 1 - Extrême gauche (petit) */}
                <div
                  className={`absolute left-[14%] top-[32%] w-[6%] h-[38%] cursor-pointer transition-all duration-300 ${
                    hoveredZone === 'pillar1' 
                      ? 'bg-cosmic-nebula-green/30 shadow-[0_0_40px_hsl(var(--cosmic-nebula-green))]'
                      : activeZone === 'pillar1'
                      ? 'bg-cosmic-nebula-green/30 shadow-[0_0_40px_hsl(var(--cosmic-nebula-green))]'
                      : 'hover:bg-cosmic-nebula-green/10 hover:shadow-[0_0_20px_hsl(var(--cosmic-nebula-green)/0.5)]'
                  }`}
                  onMouseEnter={() => setHoveredZone('pillar1')}
                  onMouseLeave={() => setHoveredZone(null)}
                  onClick={() => handleZoneClick('services', 'pillar1')}
                />

                {/* Pilier 2 - Gauche (moyen) */}
                <div
                  className={`absolute left-[22%] top-[22%] w-[6%] h-[52%] cursor-pointer transition-all duration-300 ${
                    hoveredZone === 'pillar2' 
                      ? 'bg-cosmic-purple-pink/30 shadow-[0_0_40px_hsl(var(--cosmic-purple-pink))]'
                      : activeZone === 'pillar2'
                      ? 'bg-cosmic-purple-pink/30 shadow-[0_0_40px_hsl(var(--cosmic-purple-pink))]'
                      : 'hover:bg-cosmic-purple-pink/10 hover:shadow-[0_0_20px_hsl(var(--cosmic-purple-pink)/0.5)]'
                  }`}
                  onMouseEnter={() => setHoveredZone('pillar2')}
                  onMouseLeave={() => setHoveredZone(null)}
                  onClick={() => handleZoneClick('formations', 'pillar2')}
                />

                {/* Pilier 3 - Centre-gauche (grand) */}
                <div
                  className={`absolute left-[30%] top-[12%] w-[14%] h-[64%] cursor-pointer transition-all duration-300 ${
                    hoveredZone === 'pillar3' 
                      ? 'bg-cosmic-stellar-gold/30 shadow-[0_0_40px_hsl(var(--cosmic-stellar-gold))]'
                      : activeZone === 'pillar3'
                      ? 'bg-cosmic-stellar-gold/30 shadow-[0_0_40px_hsl(var(--cosmic-stellar-gold))]'
                      : 'hover:bg-cosmic-stellar-gold/10 hover:shadow-[0_0_20px_hsl(var(--cosmic-stellar-gold)/0.5)]'
                  }`}
                  onMouseEnter={() => setHoveredZone('pillar3')}
                  onMouseLeave={() => setHoveredZone(null)}
                  onClick={() => handleZoneClick('about', 'pillar3')}
                />

                {/* Pilier 4 - Centre-droit (grand) */}
                <div
                  className={`absolute left-[52%] top-[12%] w-[14%] h-[64%] cursor-pointer transition-all duration-300 ${
                    hoveredZone === 'pillar4' 
                      ? 'bg-cosmic-royal-blue/30 shadow-[0_0_40px_hsl(var(--cosmic-royal-blue))]'
                      : activeZone === 'pillar4'
                      ? 'bg-cosmic-royal-blue/30 shadow-[0_0_40px_hsl(var(--cosmic-royal-blue))]'
                      : 'hover:bg-cosmic-royal-blue/10 hover:shadow-[0_0_20px_hsl(var(--cosmic-royal-blue)/0.5)]'
                  }`}
                  onMouseEnter={() => setHoveredZone('pillar4')}
                  onMouseLeave={() => setHoveredZone(null)}
                  onClick={() => handleZoneClick('services-products', 'pillar4')}
                />

                {/* Pilier 5 - Droite (moyen) */}
                <div
                  className={`absolute left-[72%] top-[22%] w-[6%] h-[52%] cursor-pointer transition-all duration-300 ${
                    hoveredZone === 'pillar5' 
                      ? 'bg-cosmic-nebula-purple/30 shadow-[0_0_40px_hsl(var(--cosmic-nebula-purple))]'
                      : activeZone === 'pillar5'
                      ? 'bg-cosmic-nebula-purple/30 shadow-[0_0_40px_hsl(var(--cosmic-nebula-purple))]'
                      : 'hover:bg-cosmic-nebula-purple/10 hover:shadow-[0_0_20px_hsl(var(--cosmic-nebula-purple)/0.5)]'
                  }`}
                  onMouseEnter={() => setHoveredZone('pillar5')}
                  onMouseLeave={() => setHoveredZone(null)}
                  onClick={() => handleZoneClick('testimonials', 'pillar5')}
                />

                {/* Pilier 6 - Extrême droite (petit) */}
                <div
                  className={`absolute left-[80%] top-[32%] w-[6%] h-[38%] cursor-pointer transition-all duration-300 ${
                    hoveredZone === 'pillar6' 
                      ? 'bg-cosmic-star-white/30 shadow-[0_0_40px_hsl(var(--cosmic-star-white))]'
                      : activeZone === 'pillar6'
                      ? 'bg-cosmic-star-white/30 shadow-[0_0_40px_hsl(var(--cosmic-star-white))]'
                      : 'hover:bg-cosmic-star-white/10 hover:shadow-[0_0_20px_hsl(var(--cosmic-star-white)/0.5)]'
                  }`}
                  onMouseEnter={() => setHoveredZone('pillar6')}
                  onMouseLeave={() => setHoveredZone(null)}
                  onClick={() => handleZoneClick('contact', 'pillar6')}
                />

                {/* Carré avec le "+" - Supérieur droit */}
                <div
                  className={`absolute right-[6%] top-[8%] w-[9%] h-[9%] cursor-pointer transition-all duration-300 ${
                    hoveredZone === 'plus-square' 
                      ? 'bg-cosmic-stellar-gold/30 shadow-[0_0_40px_hsl(var(--cosmic-stellar-gold))]'
                      : activeZone === 'plus-square'
                      ? 'bg-cosmic-stellar-gold/30 shadow-[0_0_40px_hsl(var(--cosmic-stellar-gold))]'
                      : 'hover:bg-cosmic-stellar-gold/10 hover:shadow-[0_0_20px_hsl(var(--cosmic-stellar-gold)/0.5)]'
                  }`}
                  onMouseEnter={() => setHoveredZone('plus-square')}
                  onMouseLeave={() => setHoveredZone(null)}
                  onClick={() => handleZoneClick('who-am-i', 'plus-square')}
                />

                {/* Base rectangulaire - Qui suis-je */}
                <div
                  className={`absolute left-[14%] bottom-[12%] w-[72%] h-[10%] cursor-pointer transition-all duration-300 ${
                    hoveredZone === 'base' 
                      ? 'bg-cosmic-nebula-purple/30 shadow-[0_0_40px_hsl(var(--cosmic-nebula-purple))]'
                      : activeZone === 'base'
                      ? 'bg-cosmic-nebula-purple/30 shadow-[0_0_40px_hsl(var(--cosmic-nebula-purple))]'
                      : 'hover:bg-cosmic-nebula-purple/10 hover:shadow-[0_0_20px_hsl(var(--cosmic-nebula-purple)/0.5)]'
                  }`}
                  onMouseEnter={() => setHoveredZone('base')}
                  onMouseLeave={() => setHoveredZone(null)}
                  onClick={() => handleZoneClick('who-am-i', 'base')}
                >
                  {/* Effet d'ouverture de bas en haut */}
                  <div className={`absolute bottom-0 left-0 w-full transition-all duration-700 ${
                    activeZone === 'base' ? 'h-full' : 'h-0'
                  } bg-gradient-to-t from-cosmic-nebula-purple/50 to-transparent`} />
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