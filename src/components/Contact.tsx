import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
const Contact = () => {
  const {
    t
  } = useTranslation();
  return <section className="py-20 px-6 relative">
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative">
          {/* Effet de rayonnement */}
          <div className="absolute inset-0 bg-gradient-radial from-cosmic-stellar-gold/20 via-cosmic-nebula-purple/10 to-transparent rounded-full blur-3xl"></div>
          
          <div className="relative bg-card/70 backdrop-blur-lg p-12 rounded-3xl border border-cosmic-stellar-gold/30">
            <h2 className="text-4xl md:text-6xl font-bold cosmic-text mb-8">
              {t('contact.title')}
            </h2>
            
            <p className="text-xl text-card-foreground mb-12 leading-relaxed max-w-2xl mx-auto text-center">{t('contact.subtitle')}</p>

            {/* Statistiques cosmiques */}
            <div className="grid grid-cols-3 gap-8 mb-12 rtl:direction-ltr">
              <div className="text-center">
                <div className="text-4xl font-bold cosmic-text">​15 padaws satisfait(e)s   </div>
                <div className="text-sm text-muted-foreground">{t('contact.transformed')}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold cosmic-text">99%</div>
                <div className="text-sm text-muted-foreground">{t('contact.satisfaction')}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold cosmic-text">5★</div>
                <div className="text-sm text-muted-foreground">{t('contact.stars')}</div>
              </div>
            </div>

            {/* CTA final */}
            <div className="space-y-6">
              
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button variant="nebula" size="lg">
                  {t('contact.newsletter')}
                </Button>
                <Button variant="cosmic" size="lg">
                  {t('contact.chat')}
                </Button>
              </div>
            </div>

            {/* Garantie */}
            
          </div>
        </div>

        {/* Contact info subtile */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>📍</span>
            <span>{t('contact.location')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📧</span>
            <span>{t('contact.email')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🌟</span>
            <span>{t('contact.availability')}</span>
          </div>
        </div>
      </div>
    </section>;
};
export default Contact;