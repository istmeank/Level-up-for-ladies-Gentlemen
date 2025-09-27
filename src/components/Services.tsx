import { Button } from "@/components/ui/button";

const Services = () => {
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
            Nos Portails d'Élévation
          </h2>
          <p className="text-xl text-cosmic-star-white/80 max-w-3xl mx-auto leading-relaxed mb-6">
            Chaque L représente un pilier, chaque pilier une nuance, 
            chaque pilier une porte qui s'ouvre sur un univers à explorer
          </p>
          <p className="text-lg text-cosmic-stellar-gold/90 font-semibold">
            Groupe Limité à 20 personnes avec un prix symbolique de 2500 DA pour les 10 premiers piliers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Connexion Session */}
          <div className="group cosmic-glow p-6 rounded-2xl hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 cosmic-text rounded-full flex items-center justify-center text-2xl mb-4 mx-auto border-2 border-cosmic-stellar-gold/30">
              🔗
            </div>
            <h3 className="text-xl font-bold text-cosmic-stellar-gold mb-3 text-center">
              Connexion Session
            </h3>
            <p className="text-cosmic-star-white/70 text-center leading-relaxed text-sm">
              Première séance obligatoire du mois pour développer des liens authentiques et apprendre à bien s'entourer
            </p>
          </div>

          {/* Lecture & Analyse */}
          <div className="group cosmic-glow p-6 rounded-2xl hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 cosmic-text rounded-full flex items-center justify-center text-2xl mb-4 mx-auto border-2 border-cosmic-stellar-gold/30">
              📚
            </div>
            <h3 className="text-xl font-bold text-cosmic-stellar-gold mb-3 text-center">
              Lecture & Analyse
            </h3>
            <p className="text-cosmic-star-white/70 text-center leading-relaxed text-sm">
              Deuxième séance : lecture et décorticage d'un chapitre de livre choisi ensemble pour enrichir nos perspectives
            </p>
          </div>

          {/* Système de Valeurs */}
          <div className="group cosmic-glow p-6 rounded-2xl hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 cosmic-text rounded-full flex items-center justify-center text-2xl mb-4 mx-auto border-2 border-cosmic-stellar-gold/30">
              💎
            </div>
            <h3 className="text-xl font-bold text-cosmic-stellar-gold mb-3 text-center">
              Système de Valeurs
            </h3>
            <p className="text-cosmic-star-white/70 text-center leading-relaxed text-sm">
              Troisième séance : exploration et compréhension profonde des valeurs et de leurs implications dans nos vies
            </p>
          </div>

          {/* Conférences Thématiques */}
          <div className="group cosmic-glow p-6 rounded-2xl hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 cosmic-text rounded-full flex items-center justify-center text-2xl mb-4 mx-auto border-2 border-cosmic-stellar-gold/30">
              🎤
            </div>
            <h3 className="text-xl font-bold text-cosmic-stellar-gold mb-3 text-center">
              Conférences Thématiques
            </h3>
            <p className="text-cosmic-star-white/70 text-center leading-relaxed text-sm">
              Quatrième séance : conférence sur un thème choisi ensemble, d'une valeur de 4000 DA chacune
            </p>
          </div>
        </div>

        {/* Avantages exclusifs */}
        <div className="mt-16 cosmic-glow p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-cosmic-stellar-gold mb-6 text-center">
            Avantages Exclusifs
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">📱</div>
              <h4 className="font-semibold text-cosmic-star-white mb-2">WhatsApp VIP</h4>
              <p className="text-sm text-cosmic-star-white/70">Accès au groupe exclusif LEVEL + et questions directes à Nacer</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-semibold text-cosmic-star-white mb-2">Meetings Google Meet</h4>
              <p className="text-sm text-cosmic-star-white/70">Chaque vendredi à 19h/20h + rediffusions de l'année</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🏆</div>
              <h4 className="font-semibold text-cosmic-star-white mb-2">Système de Points</h4>
              <p className="text-sm text-cosmic-star-white/70">Gagnez des points convertibles en récompenses exclusives</p>
            </div>
          </div>
        </div>


        <div className="text-center mt-12">
          <Button variant="royal" size="xl">
            Rejoindre nos Padawan's
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;