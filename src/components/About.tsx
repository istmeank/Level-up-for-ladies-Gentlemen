import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  return <section className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold cosmic-text mb-6">
            {t('about.title')}
          </h2>
        {/* Vision du fondateur */}
        <div className="mb-8 text-center">
          <p className="text-lg text-cosmic-stellar-gold/90 mb-4 font-semibold">
            {t('about.foundedBy')}
          </p>
          <p className="text-sm text-cosmic-star-white/60 mb-6">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Vision principale */}
        <p className="text-xl md:text-2xl text-cosmic-star-white/80 mb-8 leading-relaxed text-center">
          {t('about.vision')} <span className="animate-text-glow text-pink-400">{t('about.women')}</span> {t('about.and')} <span className="animate-text-glow text-blue-400">{t('about.men')}</span> {t('about.highValue')}
        </p>
        
        <p className="text-lg text-cosmic-star-white/70 mb-12 leading-relaxed max-w-3xl mx-auto text-center">
          {t('about.description')}
        </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cosmic-nebula-purple to-cosmic-nebula-green rounded-lg blur opacity-25"></div>
              <div className="relative bg-card p-8 rounded-lg border border-cosmic-nebula-green/20">
                <h3 className="text-2xl font-semibold text-cosmic-stellar-gold mb-4 rtl:text-right">🌟 {t('about.mission')} </h3>
                <p className="text-card-foreground leading-relaxed rtl:text-right">{t('about.missionText')} </p>
              </div>
            </div>

            <div className="relative bg-rose-600">
              <div className="absolute -inset-1 bg-gradient-to-r from-cosmic-nebula-green to-cosmic-stellar-gold rounded-lg blur opacity-25"></div>
              <div className="relative bg-card p-8 rounded-lg border border-cosmic-stellar-gold/20">
                <h3 className="text-2xl font-semibold text-cosmic-nebula-green mb-4 rtl:text-right">✨ {t('about.visionTitle')}</h3>
                <p className="text-card-foreground leading-relaxed rtl:text-right">
                  <span className="font-tangerine font-bold text-4xl text-cosmic-purple-pink animate-text-glow">{t('about.womenVision')}</span>{t('about.womenVisionText')}
                  <br /><br />
                  <span className="font-tangerine font-bold text-4xl text-cosmic-royal-blue animate-text-glow">{t('about.menVision')}</span>{t('about.menVisionText')}
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-conic from-cosmic-nebula-purple via-cosmic-stellar-gold to-cosmic-nebula-green rounded-full blur-3xl opacity-20 animate-spin-slow"></div>
            <div className="relative bg-card/50 backdrop-blur-sm p-12 rounded-3xl border border-cosmic-stellar-gold/30 text-center">
              <div className="text-6xl mb-6">🔮</div>
              <h3 className="text-3xl font-bold cosmic-text mb-6 text-center">{t('about.padawan')}</h3>
              <p className="text-card-foreground mb-8 leading-relaxed text-center">{t('about.padawanText')}</p>
              <Button variant="nebula" size="lg">
                {t('about.discoverPotential')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;
