import { Button } from "@/components/ui/button";
const About = () => {
  return <section className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold cosmic-text mb-6">
            L'Éveil Cosmique
          </h2>
        {/* Vision du fondateur */}
        <div className="mb-8 text-center">
          <p className="text-lg text-cosmic-stellar-gold/90 mb-4 font-semibold">
            Fondé par Abdenacer Maredj (ANK)
          </p>
          <p className="text-sm text-cosmic-star-white/60 mb-6">
            Psychothérapeute, Closer Professionnel & Expert en Business et Branding
          </p>
        </div>

        {/* Vision principale */}
        <p className="text-xl md:text-2xl text-cosmic-star-white/80 mb-8 leading-relaxed">
          Un jardin secret pour <span className="animate-text-glow text-pink-400">femmes</span> et <span className="animate-text-glow text-blue-400">hommes</span> de haute valeur
        </p>
        
        <p className="text-lg text-cosmic-star-white/70 mb-12 leading-relaxed max-w-3xl mx-auto">
          LEVEL UP est avant tout une terre fertile constituée d'une multitude d'argiles précieuses. 
          Vous êtes cette terre fertile qu'Allah a créée, la base de toute société avec le pouvoir de sélectionner, 
          porter la vie et l'éduquer aux côtés d'âmes véritables.
        </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cosmic-nebula-purple to-cosmic-nebula-green rounded-lg blur opacity-25"></div>
              <div className="relative bg-card p-8 rounded-lg border border-cosmic-nebula-green/20">
                <h3 className="text-2xl font-semibold text-cosmic-stellar-gold mb-4">🌟 Mission </h3>
                <p className="text-card-foreground leading-relaxed">Offrir aux Hommes et aux femmes de valeur l'opportunité de s'éveiller, progresser et de se réunir pour créer une société saine de très haute valeur </p>
              </div>
            </div>

            <div className="relative bg-rose-600">
              <div className="absolute -inset-1 bg-gradient-to-r from-cosmic-nebula-green to-cosmic-stellar-gold rounded-lg blur opacity-25"></div>
              <div className="relative bg-card p-8 rounded-lg border border-cosmic-stellar-gold/20">
                <h3 className="text-2xl font-semibold text-cosmic-nebula-green mb-4">✨ Vision</h3>
                <p className="text-card-foreground leading-relaxed"><span className="font-tangerine font-bold text-4xl text-cosmic-purple-pink animate-text-glow">Femmes</span>, vous portez en vous le pouvoir sacré de la sélection, de la création et de l'éducation. Vous êtes le jardin secret que tout homme véritable aspire à protéger.

                <br /><br />

                <span className="font-tangerine font-bold text-4xl text-cosmic-royal-blue animate-text-glow">Hommes</span>, votre mission est de guider, protéger et stabiliser. Vous êtes l'étoile dans la nuit que toute femme authentique souhaite avoir à ses côtés.

Ensemble, notre objectif commun est d'offrir à Allah une dévotion sincère et de Le remercier pour Ses innombrables bienfaits.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-conic from-cosmic-nebula-purple via-cosmic-stellar-gold to-cosmic-nebula-green rounded-full blur-3xl opacity-20 animate-spin-slow"></div>
            <div className="relative bg-card/50 backdrop-blur-sm p-12 rounded-3xl border border-cosmic-stellar-gold/30 text-center">
              <div className="text-6xl mb-6">🔮</div>
              <h3 className="text-3xl font-bold cosmic-text mb-6">À nos Padawan's</h3>
              <p className="text-card-foreground mb-8 leading-relaxed">Vous êtes cette terre bénie qu'Allah a créée, fondement de toute société florissante.</p>
              <Button variant="nebula" size="lg">
                Découvrir ton Potentiel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;