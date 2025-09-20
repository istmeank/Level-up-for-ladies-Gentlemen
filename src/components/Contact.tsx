import { Button } from "@/components/ui/button";
const Contact = () => {
  return <section className="py-20 px-6 relative">
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative">
          {/* Effet de rayonnement */}
          <div className="absolute inset-0 bg-gradient-radial from-cosmic-stellar-gold/20 via-cosmic-nebula-purple/10 to-transparent rounded-full blur-3xl"></div>
          
          <div className="relative bg-card/70 backdrop-blur-lg p-12 rounded-3xl border border-cosmic-stellar-gold/30">
            <h2 className="text-4xl md:text-6xl font-bold cosmic-text mb-8">
              Prêt(e) pour l'Élévation ?
            </h2>
            
            <p className="text-xl text-card-foreground mb-12 leading-relaxed max-w-2xl mx-auto">L'univers conspire pour ta réussite. Il ne reste qu'un pas à franchir pour entrer dans ta nouvelle réalité.</p>

            {/* Statistiques cosmiques */}
            <div className="grid grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold cosmic-text">1000+</div>
                <div className="text-sm text-muted-foreground">Âmes Transformées</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold cosmic-text">99%</div>
                <div className="text-sm text-muted-foreground">Satisfaction Galactique</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold cosmic-text">5★</div>
                <div className="text-sm text-muted-foreground">Étoiles Moyennes</div>
              </div>
            </div>

            {/* CTA final */}
            <div className="space-y-6">
              <Button variant="royal" size="xl" className="transform hover:scale-110 transition-all duration-300">
                🚀 Rejoindre l'Élite Cosmique
              </Button>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button variant="nebula" size="lg">
                  📧 Newsletter Stellaire
                </Button>
                <Button variant="cosmic" size="lg">
                  💬 Chat Quantique
                </Button>
              </div>
            </div>

            {/* Garantie */}
            <div className="mt-12 p-6 bg-cosmic-nebula-purple/20 rounded-2xl border border-cosmic-nebula-purple/30">
              <div className="text-cosmic-stellar-gold font-semibold mb-2">
                ✨ Garantie Transformation Cosmique 30 jours
              </div>
              <div className="text-sm text-muted-foreground">
                Si tu n'expérimentes pas une élévation énergétique notable, 
                nous te remboursons intégralement ton investissement.
              </div>
            </div>
          </div>
        </div>

        {/* Contact info subtile */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>📍</span>
            <span>Dimension Spirituelle Universelle</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📧</span>
            <span>contact@levelup-cosmic.com</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🌟</span>
            <span>Disponible 24/7 dans l'éther</span>
          </div>
        </div>
      </div>
    </section>;
};
export default Contact;