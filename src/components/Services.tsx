import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-20 px-6 relative">
      {/* Fond avec particules */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cosmic-nebula-green rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold cosmic-text mb-6">
            {t('services.title')}
          </h2>
          <p className="text-xl text-cosmic-star-white/80 max-w-3xl mx-auto leading-relaxed mb-6 text-center">
            {t('services.subtitle')}
          </p>
          <p className="text-lg text-cosmic-stellar-gold/90 font-semibold text-center">
            {t('services.limitedGroup')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Connexion Session */}
          <div className="group cosmic-glow p-6 rounded-2xl hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 cosmic-text rounded-full flex items-center justify-center text-2xl mb-4 mx-auto border-2 border-cosmic-stellar-gold/30">
              🔗
            </div>
            <h3 className="text-xl font-bold text-cosmic-stellar-gold mb-3 text-center">
              {t('services.connectionSession')}
            </h3>
            <p className="text-cosmic-star-white/70 text-center leading-relaxed text-sm">
              {t('services.connectionText')}
            </p>
          </div>

          {/* Lecture & Analyse */}
          <div className="group cosmic-glow p-6 rounded-2xl hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 cosmic-text rounded-full flex items-center justify-center text-2xl mb-4 mx-auto border-2 border-cosmic-stellar-gold/30">
              📚
            </div>
            <h3 className="text-xl font-bold text-cosmic-stellar-gold mb-3 text-center">
              {t('services.readingAnalysis')}
            </h3>
            <p className="text-cosmic-star-white/70 text-center leading-relaxed text-sm">
              {t('services.readingText')}
            </p>
          </div>

          {/* Système de Valeurs */}
          <div className="group cosmic-glow p-6 rounded-2xl hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 cosmic-text rounded-full flex items-center justify-center text-2xl mb-4 mx-auto border-2 border-cosmic-stellar-gold/30">
              💎
            </div>
            <h3 className="text-xl font-bold text-cosmic-stellar-gold mb-3 text-center">
              {t('services.valueSystem')}
            </h3>
            <p className="text-cosmic-star-white/70 text-center leading-relaxed text-sm">
              {t('services.valueText')}
            </p>
          </div>

          {/* Conférences Thématiques */}
          <div className="group cosmic-glow p-6 rounded-2xl hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 cosmic-text rounded-full flex items-center justify-center text-2xl mb-4 mx-auto border-2 border-cosmic-stellar-gold/30">
              🎤
            </div>
            <h3 className="text-xl font-bold text-cosmic-stellar-gold mb-3 text-center">
              {t('services.conferences')}
            </h3>
            <p className="text-cosmic-star-white/70 text-center leading-relaxed text-sm">
              {t('services.conferencesText')}
            </p>
          </div>
        </div>

        {/* Avantages exclusifs */}
        <div className="mt-16 cosmic-glow p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-cosmic-stellar-gold mb-6 text-center">
            {t('services.exclusiveAdvantages')}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">📱</div>
              <h4 className="font-semibold text-cosmic-star-white mb-2">{t('services.whatsappVIP')}</h4>
              <p className="text-sm text-cosmic-star-white/70">{t('services.whatsappText')}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-semibold text-cosmic-star-white mb-2">{t('services.googleMeet')}</h4>
              <p className="text-sm text-cosmic-star-white/70">{t('services.googleMeetText')}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🏆</div>
              <h4 className="font-semibold text-cosmic-star-white mb-2">{t('services.pointsSystem')}</h4>
              <p className="text-sm text-cosmic-star-white/70">{t('services.pointsText')}</p>
            </div>
          </div>
        </div>


        <div className="text-center mt-12">
          <Button variant="royal" size="xl">
            {t('services.joinPadawans')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
